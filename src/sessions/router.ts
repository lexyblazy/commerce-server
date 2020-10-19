import * as express from "express";
import * as handlers from "./handlers";

export const create = () => {
  const router = express.Router();

  router.post("/", handlers.create);

  return router;
};
