const express = require("express");
// const path = require("path");
const path = require("path");
const pathDir = require("../utils/pathUtils");
const contactUsRoutes = express.Router();

contactUsRoutes.get("/contact-us", (req, res, next) => {
  res.sendFile(path.join(pathDir, "views", "contact.html"));
});

contactUsRoutes.post("/contact-us", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(pathDir, "views", "successMsg.html"));
});

module.exports = contactUsRoutes;