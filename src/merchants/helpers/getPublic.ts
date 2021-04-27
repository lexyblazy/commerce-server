import _ from "lodash";

import * as consts from "../consts";

export const getPublic = (merchant: MerchantEntity) => {
  return _.pick(merchant, consts.PUBLIC_FIELDS);
};
