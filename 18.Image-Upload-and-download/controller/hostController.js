// const Home = require("../models/home");
const fs = require("fs");
// const favourites = require("../models/favourites");
const Home = require("../models/home");
const User = require("../models/user");

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
  const { homeName, location, price, rating, description } = req.body;
  const image = req.file.path;
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
    pageTitle: "Home Added Successfully",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.postEditHome = (req, res, next) => {
  const { homeName, location, price, rating, description, id } = req.body;

  Home.findById(id)
    .then((home) => {
      if (!home) {
        return res.status(404).send("Home not found");
      }

      home.homeName = homeName;
      home.location = location;
      home.price = price;
      home.rating = rating;
      home.description = description;

      if (req.file) {
        fs.unlink(home.image, (err) => {
          if (err) console.log(err);
        });

        home.image = req.file.path;
      }

      return home.save();
    })
    .then(() => {
      res.redirect("/host-home-list");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server Error");
    });
};

exports.postDeleteHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favoriteList");

  Home.findByIdAndDelete(homeId)

    .then(async () => {
      if (user.favoriteList.includes(homeId)) {
        user.favoriteList.pull(homeId);
        await user.save();
      }
    })
    .then(() => {
      res.redirect("/host-home-list");
    })
    .catch((err) => console.log(err));
};
