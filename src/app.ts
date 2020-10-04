import express from "express";

export const app = express();
const PORT = 5000;

app.get("/", (_req, res) => {
  res.send(`
    <html>
     Hello there how are you doing there
    </html>
    `);
});

app.listen(PORT, () => {
  console.log("Server is up and running");
});
