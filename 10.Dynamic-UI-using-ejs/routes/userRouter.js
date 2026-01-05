// Core module
const path = require("path");

// external Modules
const express = require("express");
const userRouter = express.Router();

const rootDir = require("../utils/pathUtils");
const { registerHomes } = require("./hostRouter");

userRouter.get("/", (req, res, next) => {
  console.log(registerHomes);
  res.sendFile(path.join(rootDir, "views", "home.html"));
});

module.exports = userRouter;
