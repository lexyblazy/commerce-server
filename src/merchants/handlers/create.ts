import bcrypt from "bcrypt";
import * as express from "express";
import * as typeorm from "typeorm";
import HttpStatus from "http-status-codes";
import _ from "lodash";
import * as uuid from "uuid";

import * as schemas from "../../schemas";
import * as sessions from "../../sessions";
import * as utils from "../../utils";
import * as kms from "../../kms";

import * as consts from "../consts";

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

      const SALT_ROUNDS = 10;

      const { email, password, firstName, lastName } = req.body;

      const signupFields = {
        email,
        password,
        firstName,
        lastName,
      };

      for (const fieldName in signupFields) {
        const fieldValue = _.get(signupFields, fieldName);
        if (_.isEmpty(fieldValue)) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .send({ error: `${fieldName} is required` });
        }
      }

      const hashedPassword = bcrypt.hashSync(
        signupFields.password,
        SALT_ROUNDS
      );

      const existingMerchant = await merchantsRepository.findOne({
        where: {
          normalizedEmail: utils.email.normalize(signupFields.email),
        },
      });

      if (existingMerchant) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ error: "email in use" });
      }

      const newMerchant: Partial<MerchantEntity> = {
        ...signupFields,
        password: hashedPassword,
        normalizedEmail: utils.email.normalize(email),
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

      await utils.email.sendEmail({
        from: kms.SETTINGS.WELCOME_EMAIL,
        to: merchant.email,
        html: emailbody,
        subject: "Welcome to Commercify",
      });

      const response = {
        merchant: _.pick(merchant, consts.PUBLIC_FIELDS),
        session: _.pick(session, sessions.consts.PUBLIC_FIELDS),
      };

      return res.send(response);
    },
    LOG_NAME,
    res
  );
};
