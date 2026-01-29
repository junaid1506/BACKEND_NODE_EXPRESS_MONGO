// const Home = require("../models/home");

// const favourites = require("../models/favourites");
const Home = require("../models/home");
const user = require("../models/user");

exports.getAddHome = (req, res, next) => {
  res.render("host/editHome", {
    pageTitle: "Register Your Home",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getHostHomeList = (req, res, next) => {
  Home.find().then((registerHomes) => {
    res.render("host/hostHomeList", {
      registerHomes: registerHomes,
      pageTitle: "airbnb Host-Home-list",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then((home) => {
    if (!home) {
      return res.redirect("/host-home-list");
    }
    // console.log(homeId, editing, home);
    res.render("host/editHome", {
      pageTitle: "Edit Your Home",
      editing: editing,
      home: home,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};
exports.postAddHome = (req, res, next) => {
  
  const { homeName, location, price, rating, description, image } = req.body;
  console.log(homeName, location, price, rating, description, image);
  const home = new Home({
    homeName,
    location,
    price,
    rating,
    description,
    image,
  });

  home.save();
  res.render("host/successMsg", {
    pageTitle: "Home Registered Successfully",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};
exports.postEditHome = (req, res, next) => {
  const { homeName, location, price, rating, description, image, id } =
    req.body;
  Home.findById(id).then((home) => {
    home.homeName = homeName;
    home.location = location;
    home.price = price;
    home.rating = rating;
    home.description = description;
    home.image = image;

    home
      .save()
      .then(() => {
        res.redirect("/host-home-list");
      })
      .catch((err) => console.log(err));
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;

  // console.log(homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      return favourites.findOneAndDelete({ homeId: homeId });
    })
    .then(() => {
      res.redirect("/host-home-list");
    })
    .catch((err) => console.log(err));
};
