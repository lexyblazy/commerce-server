import express from "express";
import HttpStatus from "http-status-codes";

const app = express();
const PORT = 5000;

app.get("/", (_req, res) => {
  res.send(HttpStatus.OK);
});

app.listen(PORT, () => {
  console.log("Server is up and running");
});
