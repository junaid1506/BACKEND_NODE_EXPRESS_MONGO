const express = require("express");
const registerRoute = express.Router();

const path = require("path");

const pathDir = require("../utils/pathUtils");

registerRoute.get("/register", (req, res, next) => {
  res.sendFile(path.join(pathDir, "views", "register.html"));
});
registerRoute.post("/register", (req, res, next) => {
  res.sendFile(path.join(pathDir, "views", "registerSuccessfull.html"));
  console.log(req.body);
});

module.exports = registerRoute;
