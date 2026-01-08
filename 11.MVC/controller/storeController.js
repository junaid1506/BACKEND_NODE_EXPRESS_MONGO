const Home = require("../models/home");

exports.getHome = (req, res, next) => {
  Home.fetchAll((registerHomes) => {
    res.render("store/homeList", {
      registerHomes: registerHomes,
      pageTitle: "airbnb Home",
    });
  });
};
exports.getBooking = (req, res, next) => {
  res.render("store/booking", {
    pageTitle: "My Bookings",
  });
};
