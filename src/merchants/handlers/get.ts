import * as express from "express";
import * as typeorm from "typeorm";

import * as products from "../../products";
import * as schemas from "../../schemas";
import * as utils from "../../utils";

import * as helpers from "../helpers";

export const get: express.RequestHandler = async (req, res) => {
  const LOG_NAME = "merchants.handlers.get =>";

  return utils.logging.logHandlerException(
    async () => {
      const businessNameSlug = req.params.slug;

      const typeormConnection = typeorm.getConnection();
      const merchantsRepository = typeormConnection.getRepository(
        schemas.merchant
      );

      const merchant = await merchantsRepository.findOne({ businessNameSlug });

      if (!merchant) {
        res.status(400).send({ error: "Merchant not found" });

        return;
      }

      const productsCatalog = await products.helpers.getCatalog(
        businessNameSlug
      );

      res.send({
        products: productsCatalog ?? [],
        merchant: helpers.getPublic(merchant),
      });
    },
    LOG_NAME,
    res
  );
};
