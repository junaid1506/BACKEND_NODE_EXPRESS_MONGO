const Home = require("../models/home");
const Favourites = require("../models/favourites");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registerHomes]) => {
    res.render("store/index", {
      registerHomes: registerHomes,
      pageTitle: "airbnb Home",
    });
  });
};
exports.getHome = (req, res, next) => {
  Home.fetchAll().then(([registerHomes]) => {
    res.render("store/homeList", {
      registerHomes: registerHomes,
      pageTitle: "airbnb Home-list",
    });
  });
};
exports.getFavroute = (req, res, next) => {
  // let allHome;
  Home.fetchAll().then(([registerHomes]) => {
    Favourites.fetchAll((favHomes) => {
      const registerHomes = allHome.filter((home) =>
        favHomes.includes(home.id)
      );
      res.render("store/favouriteList", {
        registerHomes: registerHomes,
        pageTitle: "airbnb Favourite-List",
      });
    });
  });
};

exports.getBooking = (req, res, next) => {
  res.render("store/booking", {
    pageTitle: "My Bookings",
  });
};
exports.postFavourites = (req, res, next) => {
  const fav = new Favourites(req.body.id);
  fav.save();
  res.redirect("/favroute");
};

exports.postRemoveFavourites = (req, res, next) => {
  const homeID = req.body.id;
  Favourites.removeById(homeID, () => {
    res.redirect("/favroute");
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.id;
  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
    console.log(home);
    res.render("store/homeDetail", {
      pageTitle: "Home Details",
      home: home,
    });
  });
};
