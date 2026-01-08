// Core module
const path = require("path");

// external Modules
const express = require("express");
const userRouter = express.Router();
const { getHome , getBooking } = require("../controller/storeController");

const rootDir = require("../utils/pathUtils");

userRouter.get("/", getHome);
userRouter.get("/booking", getBooking);

module.exports = userRouter;
