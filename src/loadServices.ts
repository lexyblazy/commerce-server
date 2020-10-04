import * as typeorm from "typeorm";

export const loadServices = async () => {
  const typeormConnectionOptions = await typeorm.getConnectionOptions();

  await typeorm.createConnection(typeormConnectionOptions);
  console.log("we loaded once for all");
};
