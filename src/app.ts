import bodyParser from "body-parser";
import express from "express";
import HttpStatus from "http-status-codes";

import * as utils from "./utils";

import { loadRouters } from "./loadRouters";
import { loadServices } from "./loadServices";

const main = async () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const PORT = process.env.PORT ?? 5000;

  // load database connections and kms only in development
  // AWS charges are killing me.
  if (utils.environment.isDevelopment()) {
    await loadServices();
    await loadRouters(app);
  }

  app.get("/", (_req, res) => {
    res.sendStatus(HttpStatus.OK);
  });

  app.listen(PORT);
};

main();
