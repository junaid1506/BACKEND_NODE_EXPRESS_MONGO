// Core module
const path = require("path");
const express = require("express");
const hostRouter = express.Router();
hostRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "addHome.html"));
});
hostRouter.post("/add-home", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "successMsg.html"));
});

module.exports = hostRouter;
