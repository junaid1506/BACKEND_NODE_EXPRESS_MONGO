const express = require("express");
const homeRoute = express.Router();

const path = require("path");

const pathDir = require("../utils/pathUtils");

homeRoute.get("/", (req, res, next) => {
  res.sendFile(path.join(pathDir, "views", "home.html"));
});

module.exports = homeRoute;
