const express = require("express");
const {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
} = require("../controller/authController");
const authRouter = express.Router();

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);
authRouter.post("/logout", postLogout);

authRouter.get("/signup", getSignup);

module.exports = authRouter;
