import express from "express";
import bodyParser from "body-parser";
import { loadServices } from "./loadServices";
import { loadRouters } from "./loadRouters";

const main = async () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const PORT = process.env.PORT ?? 5000;

  await loadServices();
  await loadRouters(app);

  app.listen(PORT);
};

main();
