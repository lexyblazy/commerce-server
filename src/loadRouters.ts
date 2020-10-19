import * as express from "express";
import HttpStatus from "http-status-codes";
import * as merchants from "./merchants";
import * as sessions from "./sessions";

export const loadRouters = async (app: express.Application) => {
  app.use("/merchants", merchants.router.create());

  app.use("/sessions", sessions.router.create());

  app.get("/", (_req, res) => {
    res.sendStatus(HttpStatus.OK);
  });
};
