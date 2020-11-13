import * as express from "express";
import * as typeorm from "typeorm";

import HttpStatus from "http-status-codes";

import * as schemas from "../../schemas";
import * as utils from "../../utils";

export const destroy = (req: express.Request, res: express.Response) => {
  const LOG_NAME = "session.handlers.destroy => ";

  return utils.logging.logHandlerException(
    async () => {
      const typeormConnection = typeorm.getConnection();
      const sessionsRepository = typeormConnection.getRepository(
        schemas.session
      );

      await sessionsRepository.delete({
        token: req.session.token,
      });

      res.sendStatus(HttpStatus.OK);
    },
    LOG_NAME,
    res
  );
};
