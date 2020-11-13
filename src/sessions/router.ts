import * as express from "express";

import * as auth from "../auth";
import * as handlers from "./handlers";

export const create = () => {
  const router = express.Router();

  router.post("/", handlers.create);

  router.delete("/", auth.handlers.isAuthenticated, handlers.destroy);

  return router;
};
