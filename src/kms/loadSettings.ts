import * as kms from "../kms";
import * as utils from "../utils";

import _ from "lodash";

export const SETTINGS = {} as { [k in KMSSettingKey]: string }; // this object will contain all the credential keys both  for the resolved environment

export const loadSettings = async (settings: Settings) => {
  const LOG_NAME = "kms.loadSettings =>";
  const environment = process.env.environment as Environment | undefined;

  console.log(LOG_NAME, `process.env.environment=${environment}`);

  if (!environment) {
    throw new Error("Unable to resolve server environment");
  }

  console.log(LOG_NAME, `Resolved server environment=${environment}`);

  const environmentSettings = settings[environment];

  if (!environmentSettings) {
    throw new Error("Unable to resolve server environmentSettings");
  }

  const result: Record<string, string | number> = {
    ...environmentSettings.plain,
  };

  // running KMS in only staging/prod enviroments, want to save AWS costs
  if (!utils.environment.isDevelopment()) {
    for (const key in environmentSettings.encrypted) {
      console.log(`decrypting ${key} for ${environment} environment`);
      const value: string = _.get(environmentSettings.encrypted, key);
      const decryptedValue = await kms.helpers.decrypt(value);
      result[key] = decryptedValue;
    }
  }

  Object.assign(SETTINGS, result);
};
