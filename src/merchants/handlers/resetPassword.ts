import * as express from "express";
import * as typeorm from "typeorm";

import _ from "lodash";
import bcrypt from "bcrypt";
import HttpStatus from "http-status-codes";
import moment from "moment";

import * as schemas from "../../schemas";
import * as utils from "../../utils";

import * as consts from "../consts";

export const resetPassword = (req: express.Request, res: express.Response) => {
  const LOG_NAME = "merchants.handlers.resetPassword => ";

  return utils.logging.logHandlerException(
    async () => {
      const { token, password, cpassword } = req.body;

      const fields = { token, password, cpassword };

      if (password !== cpassword) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ error: "Passwords do not match" });
      }

      for (const fieldName in fields) {
        const fieldValue = _.get(fields, fieldName);
        if (_.isEmpty(fieldValue)) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .send({ error: `${fieldName} is required` });
        }
      }

      const typeormConnection = typeorm.getConnection();
      const merchantsRepository = typeormConnection.getRepository(
        schemas.merchant
      );
      const passwordResetRequestRepository = typeormConnection.getRepository(
        schemas.passwordResetRequest
      );

      const passwordResetRequest = await passwordResetRequestRepository.findOne(
        {
          where: { token },
          relations: ["user"],
        }
      );

      if (!passwordResetRequest) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .send({ error: "Invalid password reset link" });
      }

      const hasExpired =
        moment().diff(passwordResetRequest.expiresAt, "hours") > 1;

      console.log(
        LOG_NAME,
        "Time diff",
        moment().diff(passwordResetRequest.expiresAt, "hours")
      );

      if (hasExpired) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .send({ error: "Password reset Link has expired" });
      }

      const merchant = passwordResetRequest.user;

      merchant.password = bcrypt.hashSync(password, consts.SALT_ROUNDS);

      await merchantsRepository.save(merchant);

      await passwordResetRequestRepository.delete({
        id: passwordResetRequest.id,
      });

      return res.send(HttpStatus.OK);
    },
    LOG_NAME,
    res
  );
};
