import * as express from "express";
import HttpStatus from "http-status-codes";

export const loadRouters = async (app: express.Application) => {
  app.get("/", (_req, res) => {
    res.sendStatus(HttpStatus.OK);
  });
};
