// Local Module
const userRequestHandler = require("./user");
// External Module
const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("came in first middleware" + req.url, req.method);
  next();
});
app.use((req, res, next) => {
  console.log("came in second middleware" + req.url, req.method);
  res.send(`<h1>Welcome to JND Tech`);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log("server is running");
});
