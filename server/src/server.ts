import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the World!!");
});
app.listen(5000, () => {
  console.log("Server is listening!!!");
});
