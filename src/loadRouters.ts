import * as express from "express";
import cors from "cors";
import HttpStatus from "http-status-codes";

import * as kms from "./kms";
import * as merchants from "./merchants";
import * as products from "./products";
import * as sessions from "./sessions";

export const loadRouters = async (app: express.Application) => {
  app.use(
    cors({
      origin: [kms.SETTINGS.FRONTEND_URL],
      credentials: true,
    })
  );

  app.use("/merchants", merchants.router.create());

  app.use("/sessions", sessions.router.create());

  app.use("/products", products.router.create());

  app.get("/", (_req, res) => {
    res.sendStatus(HttpStatus.OK);
  });
};
