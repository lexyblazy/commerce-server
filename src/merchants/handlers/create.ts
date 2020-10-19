import bcrypt from "bcrypt";
import * as express from "express";
import * as typeorm from "typeorm";
import HttpStatus from "http-status-codes";
import _ from "lodash";

import * as schemas from "../../schemas";
import * as sessions from "../../sessions";
import * as utils from "../../utils";

import * as consts from "../consts";

export const create = async (req: express.Request, res: express.Response) => {
  const LOG_NAME = "merchant.handlers.create => ";

  return utils.logging.logHandlerException(
    async () => {
      const typeormConnection = typeorm.getConnection();

      const merchantsRepository = typeormConnection.getRepository(
        schemas.merchant
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
        if (signupFields.hasOwnProperty(fieldName)) {
          const fieldValue = _.get(signupFields, fieldName);
          if (_.isEmpty(fieldValue)) {
            return res
              .status(HttpStatus.BAD_REQUEST)
              .send({ error: `${fieldName} is required` });
          }
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
