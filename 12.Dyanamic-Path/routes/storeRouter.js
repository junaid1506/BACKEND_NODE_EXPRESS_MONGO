// Core module
const path = require("path");

// external Modules
const express = require("express");
const userRouter = express.Router();
const {
  getIndex,
  getBooking,
  getHome,
  getFavroute,
  getHomeDetails,
} = require("../controller/storeController");

const rootDir = require("../utils/pathUtils");

userRouter.get("/", getIndex);
userRouter.get("/home-list", getHome);
userRouter.get("/booking", getBooking);
userRouter.get("/Favroute", getFavroute);
userRouter.get("/homes/:id", getHomeDetails)

module.exports = userRouter;
