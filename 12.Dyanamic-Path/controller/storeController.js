const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registerHomes) => {
    res.render("store/index", {
      registerHomes: registerHomes,
      pageTitle: "airbnb Home",
    });
  });
};
exports.getHome = (req, res, next) => {
  Home.fetchAll((registerHomes) => {
    res.render("store/homeList", {
      registerHomes: registerHomes,
      pageTitle: "airbnb Home-list",
    });
  });
};
exports.getFavroute = (req, res, next) => {
  Home.fetchAll((registerHomes) => {
    res.render("store/favouriteList", {
      registerHomes: registerHomes,
      pageTitle: "airbnb Favourite-List",
    });
  });
};

exports.getBooking = (req, res, next) => {
  res.render("store/booking", {
    pageTitle: "My Bookings",
  });
};
