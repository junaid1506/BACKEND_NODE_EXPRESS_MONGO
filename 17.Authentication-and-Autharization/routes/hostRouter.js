// Core module
const path = require("path");
const express = require("express");
const hostRouter = express.Router();
const {
  getAddHome,
  postAddHome,
  getHostHomeList,
  getEditHome,
  postEditHome,
  postDeleteHome,
} = require("../controller/hostController");
const rootDir = require("../utils/pathUtils");

hostRouter.get("/add-home", getAddHome);
hostRouter.get("/host-home-list", getHostHomeList);

hostRouter.get("/host/edit-home/:homeId", getEditHome);

hostRouter.post("/edit-home", postEditHome);
hostRouter.post("/add-home", postAddHome);
hostRouter.post("/host/delete-home/:homeId", postDeleteHome);

exports.hostRouter = hostRouter;
