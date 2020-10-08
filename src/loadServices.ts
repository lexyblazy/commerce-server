import * as typeorm from "typeorm";
import * as kms from "./kms";
import * as settings from "./settings";

export const loadServices = async () => {
  const LOG_NAME = "loadServices => ";
  const typeormConnectionOptions = await typeorm.getConnectionOptions(); // this loads the .env file  while trying to find the connection options

  kms.initialize();

  console.log(LOG_NAME, `KMS initialized`);

  await kms.loadSettings(settings);

  Object.assign(typeormConnectionOptions, {
    host: kms.SETTINGS.POSTGRES_HOST,
    port: kms.SETTINGS.POSTGRES_PORT,
    username: kms.SETTINGS.POSTGRES_USER,
    password: kms.SETTINGS.POSTGRES_PASSWORD,
    database: kms.SETTINGS.POSTGRES_DATABASE,
  });

  console.log(LOG_NAME, kms.SETTINGS);

  await typeorm.createConnection(typeormConnectionOptions);

  console.log(LOG_NAME, "Database connection established");
};
