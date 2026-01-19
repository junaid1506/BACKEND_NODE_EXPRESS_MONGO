const express = require("express");
const { getLogin, postLogin } = require("../controller/authController");
const authRouter = express.Router();

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);

module.exports = authRouter;
