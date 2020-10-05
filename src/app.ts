import express from "express";
import { loadServices } from "./loadServices";
import { loadRouters } from "./loadRouters";

const main = async () => {
  const app = express();
  const PORT = 5000;

  await loadServices();
  await loadRouters(app);

  app.listen(PORT);
};

main()
  .then(() => {
    console.log("Application Loaded");
  })
  .catch((e) => {
    console.log(console.log(e));
  });
