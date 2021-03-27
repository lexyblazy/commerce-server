import HttpStatus from "http-status-codes";
import moment from "moment";

import * as express from "express";
import * as typeorm from "typeorm";
import * as uuid from "uuid";

import * as kms from "../../kms";
import * as schemas from "../../schemas";
import * as utils from "../../utils";

export const requestPasswordReset = (
  req: express.Request,
  res: express.Response
) => {
  const LOG_NAME = "merchants.handlers.requestPasswordReset => ";

  return utils.logging.logHandlerException(
    async () => {
      const { email } = req.body;

      if (!email) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ error: "Email is required" });
      }

      const typeormConnection = typeorm.getConnection();
      const merchantsRepository = typeormConnection.getRepository(
        schemas.merchant
      );
      const passwordResetRequestRepository = typeormConnection.getRepository(
        schemas.passwordResetRequest
      );

      const normalizedEmail = utils.email.normalize(email);
      const merchant = await merchantsRepository.findOne({ normalizedEmail });

      if (!merchant) {
        // send OK to here to avoid bruteforce
        return res.send(HttpStatus.OK);
      }

      const newPasswordResetRequest: Partial<PasswordResetRequestEntity> = {
        token: uuid.v4(),
        expiresAt: moment().add(1, "hours").toDate(),
        user: merchant,
      };

      const passwordResetRequest = await passwordResetRequestRepository.save(
        newPasswordResetRequest
      );

      const link = `${kms.SETTINGS.SERVER_URL}/merchants/reset-password?token=${passwordResetRequest.token}`;

      // sendgrid has a habit of sanitizing `localhost` links from the email body, using a google search prefix to ensure link is accesible
      const embedLink = `https://google.com/search?q=${link}`;

      // TODO - refactor to use email templates
      const emailbody = `
        Hello ${merchant.firstName},
 
        <p>Click the link below to reset your password, link expires in one(1) hour.</p>
        
 
        <a href="${
          utils.environment.isDevelopment() ? embedLink : link
        }">RESET PASSWORD</a> <br /> <br />
 
        We hope that you enjoy your experience using our platform.
       `;

      await utils.email.sendEmail({
        to: merchant.email,
        from: kms.SETTINGS.SUPPORT_EMAIL,
        subject: `Reset your password`,
        html: emailbody,
      });

      return res.send(HttpStatus.OK);
    },
    LOG_NAME,
    res
  );
};
