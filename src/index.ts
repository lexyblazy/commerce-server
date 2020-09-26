import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.send(`
    <html>
     Hello there how are you doing
    </html>
    `);
});

app.listen(5000, () => {
  console.log("Server is up and running");
});
