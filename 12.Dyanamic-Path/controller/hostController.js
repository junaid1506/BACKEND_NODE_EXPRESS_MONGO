const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", { pageTitle: "Register Your Home" });
};

exports.getHostHomeList = (req, res, next) => {
  Home.fetchAll((registerHomes) => {
    res.render("host/hostHomeList", {
      registerHomes: registerHomes,
      pageTitle: "airbnb Host-Home-list",
    });
  });
};
exports.postAddHome = (req, res, next) => {
  const home = new Home(
    req.body.name,
    req.body.location,
    req.body.price,
    req.body.rating,
    req.body.photoUrl
  );

  home.save();
  res.render("host/successMsg", { pageTitle: "Home Registered Successfully" });
};
