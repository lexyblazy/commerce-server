import * as express from "express";
import * as typeorm from "typeorm";
// import HttpStatus from "http-status-codes";

import * as schemas from "../../schemas";
import * as utils from "../../utils";

// import * as helpers from "../helpers";

export const list = async (req: express.Request, res: express.Response) => {
  const LOG_NAME = "products.handlers.list => ";

  return utils.logging.logHandlerException(
    async () => {
      const typeormConnection = typeorm.getConnection();
      const productsRepository = typeormConnection.getRepository(
        schemas.product
      );

      const products = await productsRepository.find({
        where: { merchant: req.session.user },
      });

      return res.send(products);
    },
    LOG_NAME,
    res
  );
};
