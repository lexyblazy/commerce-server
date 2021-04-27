import * as express from "express";
import * as typeorm from "typeorm";
import _ from "lodash";
import BigNumber from "bignumber.js";
import HttpStatus from "http-status-codes";
import Joi from "joi";
import nanoid from "nanoid";

import * as schemas from "../../schemas";
import * as utils from "../../utils";
import slug from "slug";

const validate = <T>(body: T) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.alternatives(Joi.string(), Joi.number()).required(),
    comparePrice: Joi.string(),
    costPerItem: Joi.alternatives(Joi.string(), Joi.number()).required(),
    barcode: Joi.string().required(),
    sku: Joi.string().required(),
    isPhysicalProduct: Joi.boolean().required(),
    quantity: Joi.when("isPhysicalProduct", {
      is: Joi.boolean().valid(true).required(),
      then: Joi.number().min(1).required(),
      otherwise: Joi.number(),
    }),
  });

  const { value, error } = schema.validate(body);

  if (error) {
    return { ok: false, error: error.details[0].message };
  }
  return { ok: true, value };
};

export const create = async (req: express.Request, res: express.Response) => {
  const LOG_NAME = "products.handlers.create => ";

  return utils.logging.logHandlerException(
    async () => {
      const {
        name,
        description,
        price,
        comparePrice,
        costPerItem,
        barcode,
        sku,
        isPhysicalProduct,
        quantity,
        allowOutOfStockPurchase,
      } = req.body;

      const validationResult = validate({
        name,
        description,
        price,
        isPhysicalProduct,
        quantity,
        sku,
        barcode,
        costPerItem,
        comparePrice,
      });

      if (!validationResult.ok) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ error: validationResult.error });
      }

      const typeormConnection = typeorm.getConnection();
      const productsRepository = typeormConnection.getRepository(
        schemas.product
      );

      const costPerItemBigNumber = new BigNumber(costPerItem);
      const priceBigNumber = new BigNumber(price);

      if (costPerItemBigNumber.isGreaterThan(priceBigNumber)) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ error: "Cost price cannot be greater than selling price" });
      }

      const existingProduct = await productsRepository.findOne({
        where: [
          {
            merchant: req.session.user,
            sku,
          },
          {
            merchant: req.session.user,
            barcode,
          },
        ],
      });

      if (existingProduct) {
        let error = "";
        if (existingProduct.sku === sku) {
          error = `Product with SKU = ${sku} already exists`;
        } else if (existingProduct.barcode === barcode) {
          error = `Product with barcode = ${barcode} already exists`;
        }

        return res.status(HttpStatus.BAD_REQUEST).send({ error });
      }

      const newProduct: Partial<ProductEntity> = {
        name,
        description,
        price: priceBigNumber,
        costPerItem: costPerItemBigNumber,
        comparePrice: comparePrice ? new BigNumber(comparePrice) : null,
        isPhysicalProduct,
        quantity:
          isPhysicalProduct && quantity ? new BigNumber(quantity) : null,
        barcode,
        sku,
        allowOutOfStockPurchase,
        slug: `${slug(name)}-${nanoid.nanoid()}`,
        merchant: req.session.user,
      };

      const product = await productsRepository.save(newProduct);

      return res.send({ product: _.omit(product, "merchant") });
    },
    LOG_NAME,
    res
  );
};
