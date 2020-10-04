import * as express from "express";
import HttpStatus from "http-status-codes";

export const loadRouters = async (
  loadServicesPromise: LoadServicesPromise,
  app: express.Application
) => {
  await loadServicesPromise;

  app.get("/", (_req, res) => {
    res.sendStatus(HttpStatus.OK);
  });
};
