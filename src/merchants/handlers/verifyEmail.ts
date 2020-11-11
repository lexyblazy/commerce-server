import * as express from "express";
import * as typeorm from "typeorm";
import HttpStatus from "http-status-codes";

import * as schemas from "../../schemas";
import * as utils from "../../utils";

export const verifyEmail = async (
  req: express.Request,
  res: express.Response
) => {
  const LOG_NAME = "merchants.handlers.verifyEmail => ";

  return utils.logging.logHandlerException(
    async () => {
      const token = req.query.token as string;

      const typeormConnection = typeorm.getConnection();

      const emailVerificationRequestsRepository = typeormConnection.getRepository(
        schemas.emailVerificationRequest
      );
      const merchantsRepository = typeormConnection.getRepository(
        schemas.merchant
      );

      const emailVerificationRequest = await emailVerificationRequestsRepository.findOne(
        {
          where: {
            token,
          },
          relations: ["user"],
        }
      );

      if (!emailVerificationRequest) {
        res.status(HttpStatus.UNAUTHORIZED).send({ error: "Invalid link" });

        return;
      }

      console.log(LOG_NAME, "User:", emailVerificationRequest.user);

      await merchantsRepository.update(
        {
          id: emailVerificationRequest.user.id,
        },
        {
          emailVerified: true,
        }
      );

      await emailVerificationRequestsRepository.delete({
        id: emailVerificationRequest.id,
      });

      res.send({ message: "email verified" });
    },
    LOG_NAME,
    res
  );
};
