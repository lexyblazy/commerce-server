import _ from "lodash";

import * as merchants from "../../merchants";

export const getPublic = (product: ProductEntity) => {
  return {
    product: _.omit(product, "merchant"),
    merchant: _.pick(product.merchant, merchants.consts.PUBLIC_FIELDS),
  };
};
