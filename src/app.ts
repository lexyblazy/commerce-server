import express from "express";
import { loadServices } from "./loadServices";
import { loadRouters } from "./loadRouters";

const app = express();
const PORT = 5000;

const loadServicesPromise = loadServices();
const loadServicesAndRoutersPromise = loadRouters(loadServicesPromise, app);

app.use(async (_req, _res, next) => {
  await loadServicesAndRoutersPromise;
  next();
});

app.listen(PORT, () => {
  console.log("Server is up and running");
});
