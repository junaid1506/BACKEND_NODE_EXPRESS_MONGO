const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", { pageTitle: "Register Your Home" });
};

exports.postAddHome = (req, res, next) => {
  const home = new Home(req.body.houseName, req.body.location, req.body.price);
  home.save();
  res.render("host/successMsg", { pageTitle: "Home Registered Successfully" });
};

