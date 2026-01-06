// Core module
const path = require("path");

// external Modules
const express = require("express");
const userRouter = express.Router();

const rootDir = require("../utils/pathUtils");
const { registerHomes } = require("./hostRouter");

userRouter.get("/", (req, res, next) => {
  console.log(registerHomes);
  res.render("home", { registerHomes });
});

module.exports = userRouter;
