import * as express from "express";

import * as auth from "../auth";

import * as handlers from "./handlers";

export const create = () => {
  const router = express.Router();

  router.post("/", auth.handlers.isAuthenticated, handlers.create);

  router.get("/:id", handlers.get);

  // publicly available
  router.get("/:merchantId/products", handlers.list.external);

  // only available to the real merchant
  router.get(
    "/products",
    auth.handlers.isAuthenticated,
    handlers.list.internal
  );

  return router;
};
