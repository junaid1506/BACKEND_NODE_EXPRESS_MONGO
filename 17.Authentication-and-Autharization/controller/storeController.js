const Home = require("../models/home");
const User = require("../models/user");
// const user = require("../models/user");

exports.getIndex = (req, res, next) => {
  console.log("isLoggedIn", req.session);
  Home.find().then((registerHomes) => {
    res.render("store/index", {
      registerHomes: registerHomes,
      pageTitle: "airbnb Home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};
exports.getHome = (req, res, next) => {
  Home.find().then((registerHomes) => {
    res.render("store/homeList", {
      registerHomes: registerHomes,
      pageTitle: "airbnb Home-list",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};
exports.getFavroute = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favoriteList");
  console.log("USER FAVORITES", user);
  res.render("store/favouriteList", {
    registerHomes: user.favoriteList,
    pageTitle: "airbnb Favourite-List",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getBooking = (req, res, next) => {
  res.render("store/booking", {
    pageTitle: "My Bookings",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};
exports.postFavourites = async (req, res, next) => {
  const id = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favoriteList.includes(id)) {
    user.favoriteList.push(id);
    await user.save();
  }

  res.redirect("/favroute");
};

exports.postRemoveFavourites = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  user.favoriteList.pull(homeId);
  await user.save();

  res.redirect("/favroute");
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.id;
  Home.findById(homeId).then((home) => {
    res.render("store/homeDetail", {
      pageTitle: "Home Details",
      home: home,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};
