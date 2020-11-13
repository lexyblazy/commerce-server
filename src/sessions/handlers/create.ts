import * as bcrypt from "bcrypt";
import * as express from "express";
import * as typeorm from "typeorm";
import * as uuid from "uuid";

import _ from "lodash";
import HttpStatus from "http-status-codes";

import * as schemas from "../../schemas";
import * as utils from "../../utils";

import * as consts from "../consts";

export const create = async (req: express.Request, res: express.Response) => {
  const LOG_NAME = "session.handlers.create => ";

  return utils.logging.logHandlerException(
    async () => {
      const typeormConnection = typeorm.getConnection();
      const merchantsRepository = typeormConnection.getRepository(
        schemas.merchant
      );
      const sessionsRepository = typeormConnection.getRepository(
        schemas.session
      );

      const { email, password } = req.body;

      const loginFields = {
        email,
        password,
      };

      for (const fieldName in loginFields) {
        const fieldValue = _.get(loginFields, fieldName);
        if (_.isEmpty(fieldValue)) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .send({ error: `${fieldName} is required` });
        }
      }

      const merchant = await merchantsRepository.findOne({
        where: {
          normalizedEmail: utils.email.normalize(email),
        },
      });

      if (!merchant) {
        return res.sendStatus(HttpStatus.UNAUTHORIZED);
      }

      const isCorrectPassword = bcrypt.compareSync(password, merchant.password);

      if (!isCorrectPassword) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .send({ error: "Incorrect email or password" });
      }

      const newSession: Partial<SessionEntity> = {
        user: merchant,
        token: uuid.v4(),
      };

      const session = await sessionsRepository.save(newSession);

      return res.send(_.pick(session, consts.PUBLIC_FIELDS));
    },
    LOG_NAME,
    res
  );
};
