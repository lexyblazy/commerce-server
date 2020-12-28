import * as express from "express";
import cors from "cors";
import HttpStatus from "http-status-codes";

import * as merchants from "./merchants";
import * as sessions from "./sessions";

export const loadRouters = async (app: express.Application) => {
  app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

  app.use("/merchants", merchants.router.create());

  app.use("/sessions", sessions.router.create());

  app.get("/", (_req, res) => {
    res.sendStatus(HttpStatus.OK);
  });
};
