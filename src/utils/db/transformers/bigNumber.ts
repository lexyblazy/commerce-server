import _ from "lodash";
import BigNumber from "bignumber.js";

export const to = (value: string | number) => {
  if (_.isNil(value)) {
    return value;
  } else if (BigNumber.isBigNumber(value)) {
    return value.toString();
  } else {
    return new BigNumber(value).toString();
  }
};

export const from = (value: string | number) => {
  if (_.isNil(value)) {
    return value;
  } else {
    return new BigNumber(value);
  }
};
