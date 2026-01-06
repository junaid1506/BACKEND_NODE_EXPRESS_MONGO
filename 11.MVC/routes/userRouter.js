// Core module
const path = require("path");

// external Modules
const express = require("express");
const userRouter = express.Router();
const { getHome } = require("../controller/home");

const rootDir = require("../utils/pathUtils");

userRouter.get("/", getHome);

module.exports = userRouter;
