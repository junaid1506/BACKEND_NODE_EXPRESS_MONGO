// Core module
const path = require("path");
const express = require("express");
const hostRouter = express.Router();
const { getAddHome, postAddHome } = require("../controller/home");
const rootDir = require("../utils/pathUtils");

hostRouter.get("/add-home", getAddHome);

hostRouter.post("/add-home", postAddHome);

exports.hostRouter = hostRouter;
