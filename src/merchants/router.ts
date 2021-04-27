import * as express from "express";
import * as handlers from "./handlers";

export const create = () => {
  const router = express.Router();

  router.post("/", handlers.create);

  router.get("/verify-email", handlers.verifyEmail);

  router.post("/request-password-reset", handlers.requestPasswordReset);

  router.post("/reset-password", handlers.resetPassword);

  router.get("/:slug", handlers.get);

  return router;
};
