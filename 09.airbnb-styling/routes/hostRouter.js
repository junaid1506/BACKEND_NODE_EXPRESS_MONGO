// Core module
const path = require("path");
const express = require("express");
const hostRouter = express.Router();

const rootDir = require("../utils/pathUtils");

hostRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "addHome.html"));
});
hostRouter.post("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "successMsg.html"));
});

module.exports = hostRouter;
