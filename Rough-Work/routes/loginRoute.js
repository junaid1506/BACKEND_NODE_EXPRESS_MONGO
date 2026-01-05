const express = require("express");
const loginRoute = express.Router();

const path = require("path");

const pathDir = require("../utils/pathUtils");

loginRoute.get("/login", (req, res, next) => {
  res.sendFile(path.join(pathDir, "views", "login.html"));
});
loginRoute.post("/login", (req, res, next) => {
  res.sendFile(path.join(pathDir, "views", "loginSuccesfull.html"));
  console.log(req.body);
});

module.exports = loginRoute;
