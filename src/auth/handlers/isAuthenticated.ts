import * as express from "express";
import HttpStatus from "http-status-codes";
import * as typeorm from "typeorm";
import * as schemas from "../../schemas";
import * as utils from "../../utils";

export const isAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const LOG_NAME = "auth.handlers.isAuthenticated => ";

  return utils.logging.logHandlerException(
    async () => {
      const typeormConnection = typeorm.getConnection();
      const sessionsRepository = typeormConnection.getRepository(
        schemas.session
      );

      const token = req.headers.authorization;

      const session = await sessionsRepository.findOne({
        where: {
          token,
        },
        relations: ["user"],
      });

      if (!session) {
        res.status(HttpStatus.UNAUTHORIZED).send({ error: "Unauthorized" });

        return;
      }

      req.session = session;

      next();
    },
    LOG_NAME,
    res
  );
};
