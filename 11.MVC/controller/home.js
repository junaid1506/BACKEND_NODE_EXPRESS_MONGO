const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("addHome", { pageTitle: "Register Your Home" });
};

exports.postAddHome = (req, res, next) => {
  const home = new Home(req.body.houseName, req.body.location, req.body.price);
  home.save();
  res.render("successMsg", { pageTitle: "Home Registered Successfully" });
};

exports.getHome = (req, res, next) => {
  Home.fetchAll((registerHomes) => {
    res.render("home", {
      registerHomes: registerHomes,
      pageTitle: "airbnb Home",
    });
  });
};
