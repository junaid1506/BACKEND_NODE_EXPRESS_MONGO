// Core module
const path = require("path");
const express = require("express");
const hostRouter = express.Router();

const rootDir = require("../utils/pathUtils");

hostRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "addHome.html"));
});

const registerHomes = [];
hostRouter.post("/add-home", (req, res, next) => {
  registerHomes.push({
    houseName: req.body.houseName,
    localion: req.body.location,
    price: req.body.price,
  });
  // console.log(registerHomes);

  res.sendFile(path.join(rootDir, "views", "successMsg.html"));
});

exports.hostRouter = hostRouter;
exports.registerHomes = registerHomes;
