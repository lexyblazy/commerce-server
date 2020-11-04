import _ from "lodash";
import * as kms from "../kms";

export const SETTINGS: Record<string, string> = {}; // this object will contain all the credential keys both  for the resolved environment

export const loadSettings = async (settings: KMSSettings) => {
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

  for (const key in environmentSettings.encrypted) {
    if (environmentSettings.encrypted.hasOwnProperty(key)) {
      console.log(`decrypting ${key} for ${environment} environment`);
      const value: string = _.get(environmentSettings.encrypted, key);
      const decryptedValue = await kms.helpers.decrypt(value);
      result[key] = decryptedValue;
    }
  }

  Object.assign(SETTINGS, result);
};
