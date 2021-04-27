import * as express from "express";

import * as auth from "../auth";
import * as handlers from "./handlers";

export const create = () => {
  const router = express.Router();

  router.post(
    "/signed-url",
    auth.handlers.isAuthenticated,
    handlers.getSignedUrl
  );

  return router;
};
