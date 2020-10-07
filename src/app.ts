import express from "express";
import { loadServices } from "./loadServices";
import { loadRouters } from "./loadRouters";

const main = async () => {
  const app = express();

  // tslint:disable-next-line
  const PORT = process.env.PORT ?? 5000;

  await loadServices();
  await loadRouters(app);

  app.listen(PORT);
};
main();
