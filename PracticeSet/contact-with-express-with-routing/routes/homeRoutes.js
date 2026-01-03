const express = require("express");
// const path = require("path");
const path = require("path");
const pathDir = require("../utils/pathUtils");
const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(pathDir, "views", "home.html"));
});


module.exports = userRouter;
