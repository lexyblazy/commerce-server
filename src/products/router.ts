import * as express from "express";

import * as auth from "../auth";

import * as handlers from "./handlers";

export const create = () => {
  const router = express.Router();

  router.post("/", auth.handlers.isAuthenticated, handlers.create);

  router.get("/:slug", handlers.get);

  router.get("/", auth.handlers.isAuthenticated, handlers.list);

  return router;
};
