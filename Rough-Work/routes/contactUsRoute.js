const express = require("express");
const contactUsRoute = express.Router();

const path = require("path");

const pathDir = require("../utils/pathUtils");

contactUsRoute.get("/contact-us", (req, res, next) => {
  res.sendFile(path.join(pathDir, "views", "contact-us.html"));
});
contactUsRoute.post("/contact-us", (req, res, next) => {
  res.sendFile(path.join(pathDir, "views", "contact-us-succesfull.html"));
  console.log(req.body);
});

module.exports = contactUsRoute;
