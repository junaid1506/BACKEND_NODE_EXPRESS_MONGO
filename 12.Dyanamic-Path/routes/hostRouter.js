// Core module
const path = require("path");
const express = require("express");
const hostRouter = express.Router();
const {
  getAddHome,
  postAddHome,
  getHostHomeList,
} = require("../controller/hostController");
const rootDir = require("../utils/pathUtils");

hostRouter.get("/add-home", getAddHome);
hostRouter.get("/host-home-list", getHostHomeList);

hostRouter.post("/add-home", postAddHome);

exports.hostRouter = hostRouter;
