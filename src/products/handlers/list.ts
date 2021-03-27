import * as express from "express";
import * as typeorm from "typeorm";
import HttpStatus from "http-status-codes";

import * as schemas from "../../schemas";
import * as utils from "../../utils";

export const external = (req: express.Request, res: express.Response) => {
  const LOG_NAME = "merchants.handlers.products.list.external =>";

  return utils.logging.logFunctionException(async () => {
    const typeormConnection = typeorm.getConnection();

    const productsRepository = typeormConnection.getRepository(schemas.product);

    const { merchantId } = req.params;
    if (!utils.uuid.isValid(merchantId)) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: "Invalid merchant" });
    }

    const products = await productsRepository.find({
      where: {
        merchant: merchantId,
      },
      order: {
        createdAt: "DESC",
      },
    });

    return res.send({ products });
  }, LOG_NAME);
};

export const internal = (req: express.Request, res: express.Response) => {
  const LOG_NAME = "merchants.handlers.products.list.internal =>";

  return utils.logging.logFunctionException(async () => {
    const typeormConnection = typeorm.getConnection();

    const productsRepository = typeormConnection.getRepository(schemas.product);

    const merchantId = req.session.user.id;

    const products = await productsRepository.find({
      where: {
        merchant: merchantId,
      },
      order: {
        createdAt: "DESC",
      },
    });

    return res.send({ products });
  }, LOG_NAME);
};
