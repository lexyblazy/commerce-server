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
    description: Joi.alternatives(Joi.string(), Joi.number()).required(),
    price: Joi.allow().required(),
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
      const { name, description, price } = req.body;

      const validationResult = validate({
        name,
        description,
        price,
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

      const newProduct: Partial<ProductEntity> = {
        name,
        description,
        price: new BigNumber(price),
        merchant: req.session.user,
        slug: `${slug(name)}-${nanoid.nanoid()}`,
      };

      const product = await productsRepository.save(newProduct);

      return res.send({ product: _.omit(product, "merchant") });
    },
    LOG_NAME,
    res
  );
};
