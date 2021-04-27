import * as express from "express";
import * as typeorm from "typeorm";
import HttpStatus from "http-status-codes";

import * as schemas from "../../schemas";
import * as utils from "../../utils";

import * as helpers from "../helpers";

export const get = async (req: express.Request, res: express.Response) => {
  const LOG_NAME = "products.handlers.get => ";

  return utils.logging.logHandlerException(
    async () => {
      const typeormConnection = typeorm.getConnection();
      const productsRepository = typeormConnection.getRepository(
        schemas.product
      );

      const product = await productsRepository.findOne({
        where: { slug: req.params.slug },
        relations: ["merchant"],
      });

      if (!product) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ error: "Product not found" });
      }

      return res.send(helpers.getPublic(product));
    },
    LOG_NAME,
    res
  );
};
