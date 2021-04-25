import * as express from "express";
import * as typeorm from "typeorm";
import * as uuid from "uuid";
import Joi from "joi";
import slug from "slug";

import _ from "lodash";
import bcrypt from "bcrypt";
import HttpStatus from "http-status-codes";

import * as kms from "../../kms";
import * as schemas from "../../schemas";
import * as sessions from "../../sessions";
import * as utils from "../../utils";

import * as consts from "../consts";
import * as helpers from "../helpers";

const validate = <T>(body: T) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    storeName: Joi.string().required(),
  });

  const { value, error } = schema.validate(body);

  if (error) {
    return { ok: false, error: error.details[0].message };
  }
  return { ok: true, value };
};

export const create = async (req: express.Request, res: express.Response) => {
  const LOG_NAME = "merchant.handlers.create => ";

  return utils.logging.logHandlerException(
    async () => {
      const typeormConnection = typeorm.getConnection();

      const merchantsRepository = typeormConnection.getRepository(
        schemas.merchant
      );

      const emailVerificationRequestsRepository = typeorm.getRepository(
        schemas.emailVerificationRequest
      );

      const { email, password, firstName, lastName, storeName } = req.body;

      const signupFields = {
        email,
        password,
        firstName,
        lastName,
        storeName,
      };

      const validationResult = validate(signupFields);

      if (!validationResult.ok) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ error: validationResult.error });
      }

      console.log(LOG_NAME, slug(storeName));

      const hashedPassword = bcrypt.hashSync(
        signupFields.password,
        consts.SALT_ROUNDS
      );

      const storeNameSlug = slug(storeName);
      const normalizedEmail = utils.email.normalize(signupFields.email);

      const existingMerchant = await merchantsRepository.findOne({
        where: [
          {
            normalizedEmail,
          },
          {
            storeNameSlug,
          },
        ],
      });

      if (existingMerchant) {
        if (existingMerchant.normalizedEmail === normalizedEmail) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .send({ error: "email in use" });
        } else if (existingMerchant.storeNameSlug === storeNameSlug) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .send({ error: "business name already taken" });
        }

        return res.sendStatus(HttpStatus.BAD_REQUEST);
      }

      const newMerchant: Partial<MerchantEntity> = {
        ...signupFields,
        password: hashedPassword,
        normalizedEmail: utils.email.normalize(email),
        storeNameSlug,
      };

      const merchant = await merchantsRepository.save(newMerchant);

      const session = await sessions.helpers.create(merchant);

      const emailVerificationRequest = await emailVerificationRequestsRepository.save(
        {
          user: merchant,
          token: uuid.v4(),
        }
      );

      const link = `${kms.SETTINGS.SERVER_URL}/merchants/verify-email?token=${emailVerificationRequest.token}`;

      // sendgrid has a habit of sanitizing `localhost` links from the email body, using a google search prefix to ensure link is accesible
      const embedLink = `https://google.com/search?q=${link}`;

      // TODO - refactor to use email templates
      const emailbody = `
       Hello ${merchant.firstName},

       <p>Click the link the below to verify your account</p>
       

       <a href="${
         utils.environment.isDevelopment() ? embedLink : link
       }">VERIFY MY ACCOUNT</a> <br /> <br />

       We hope that you enjoy your experience using our platform.
      `;

      utils.email.sendEmail({
        from: kms.SETTINGS.WELCOME_EMAIL,
        to: merchant.email,
        html: emailbody,
        subject: "Welcome to Commercify",
      });

      const response = {
        merchant: helpers.getPublic(merchant),
        session: _.pick(session, sessions.consts.PUBLIC_FIELDS),
      };

      return res.send(response);
    },
    LOG_NAME,
    res
  );
};
