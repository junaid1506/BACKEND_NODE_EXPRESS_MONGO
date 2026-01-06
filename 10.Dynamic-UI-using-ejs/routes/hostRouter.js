// Core module
const path = require("path");
const express = require("express");
const hostRouter = express.Router();

const rootDir = require("../utils/pathUtils");

hostRouter.get("/add-home", (req, res, next) => {
  res.render("addHome", { pageTitle: "Register Your Home" });
});

const registerHomes = [];
hostRouter.post("/add-home", (req, res, next) => {
  registerHomes.push({
    houseName: req.body.houseName,
    localion: req.body.location,
    price: req.body.price,
  });
  // console.log(registerHomes);

  res.render("successMsg", { pageTitle: "Home Registered Successfully" });
});

exports.hostRouter = hostRouter;
exports.registerHomes = registerHomes;
