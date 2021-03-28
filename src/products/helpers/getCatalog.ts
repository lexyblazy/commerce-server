import * as typeorm from "typeorm";

import * as schemas from "../../schemas";
import * as utils from "../../utils";

export const getCatalog = async (storeNameSlug: string) => {
  const LOG_NAME = "products.helpers.getCatalog =>";

  return utils.logging.logFunctionException(async () => {
    const typeormConnection = typeorm.getConnection();

    const productsRepository = typeormConnection.getRepository(schemas.product);
    const merchantsRepository = typeormConnection.getRepository(
      schemas.merchant
    );

    const merchantQuerybuilder = merchantsRepository
      .createQueryBuilder("merchant")
      .where(`merchant.storeNameSlug = :storeNameSlug`, {
        storeNameSlug,
      })
      .select("merchant.id");

    const products = await productsRepository
      .createQueryBuilder("product")
      .where(`product.merchantId = (${merchantQuerybuilder.getQuery()})`)
      .setParameters(merchantQuerybuilder.getParameters())
      .getMany();

    return products;
  }, LOG_NAME);
};
