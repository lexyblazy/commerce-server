import * as express from "express";
import * as typeorm from "typeorm";
import HttpStatus from "http-status-codes";

import * as schemas from "../../schemas";
import * as utils from "../../utils";

export const get = async (req: express.Request, res: express.Response) => {
  const LOG_NAME = "products.handlers.get => ";

  return utils.logging.logHandlerException(
    async () => {
      const typeormConnection = typeorm.getConnection();
      const productsRepository = typeormConnection.getRepository(
        schemas.product
      );

      if (!utils.uuid.isValid(req.params.id)) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ error: "Product not found" });
      }

      const product = await productsRepository.findOne({ id: req.params.id });

      if (!product) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ error: "Product not found" });
      }

      return res.send(product);
    },
    LOG_NAME,
    res
  );
};
