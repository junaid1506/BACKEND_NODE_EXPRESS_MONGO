// Local Module
const userRequestHandler = require("./user");
// External Module
const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
  console.log("came in first middleware" + req.url, req.method);
  //res.send(`<h1>First Middelware`);
  next();
});

app.post("/submit", (req, res, next) => {
  console.log("came in second middleware" + req.url, req.method);
  res.send(`<h1>Welcome to JND Tech</h1>`);
});

app.use("/", (req, res, next) => {
  console.log("came in another middleware" + req.url, req.method);
  res.send(`<h1>another Middelware</h1>`);
  // next();
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log("server is running");
});
