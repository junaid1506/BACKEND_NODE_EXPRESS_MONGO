const Home = require("../models/home");
const Favourites = require("../models/favourites");

exports.getIndex = (req, res, next) => {
  Home.find().then((registerHomes) => {
    res.render("store/index", {
      registerHomes: registerHomes,
      pageTitle: "airbnb Home",
      isLoggedIn : req.isLoggedIn
    });
  });
};
exports.getHome = (req, res, next) => {
  Home.find().then((registerHomes) => {
    res.render("store/homeList", {
      registerHomes: registerHomes,
      pageTitle: "airbnb Home-list",
      isLoggedIn : req.isLoggedIn
    });
  });
};
exports.getFavroute = (req, res, next) => {
  // let allHome;
  Home.find().then((registerHomes) => {
    allHome = registerHomes;
    Favourites.find().then((favHomes) => {
      const favouriteHomes = allHome.filter((home) =>
        favHomes.find((fav) => fav.homeId.toString() === home._id.toString()),
      );
      res.render("store/favouriteList", {
        registerHomes: favouriteHomes,
        pageTitle: "airbnb Favourite-List",
        isLoggedIn : req.isLoggedIn
      });
    });
  });

  // Home.find().then((registerHomes) => {
  //   Favourites.find().then((favHomes) => {
  //     const registerHomes = registerHomes.filter((home) =>
  //       favHomes.includes(home._id)
  //     );
  //     res.render("store/favouriteList", {
  //       registerHomes: registerHomes,
  //       pageTitle: "airbnb Favourite-List",
  //     });
  //   });
  // });
};

exports.getBooking = (req, res, next) => {
  res.render("store/booking", {
    pageTitle: "My Bookings",
    isLoggedIn : req.isLoggedIn
  });
};
exports.postFavourites = (req, res, next) => {
  const id = req.body.id;
  Favourites.findOne({ homeId: id }).then((existingFav) => {
    if (existingFav) {
      return res.redirect("/favroute");
    }
    const fav = new Favourites({ homeId: id });
    fav.save().then(() => {
      console.log("Added to Favourites");
      res.redirect("/favroute");
    });
  });
};

exports.postRemoveFavourites = (req, res, next) => {
  const homeId = req.body.id;

  Favourites.findOneAndDelete({ homeId })
    .then(() => {
      res.redirect("/favroute");
    })
    .catch((err) => console.log(err));
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.id;
  Home.findById(homeId).then((home) => {
    res.render("store/homeDetail", {
      pageTitle: "Home Details",
      home: home,
      isLoggedIn : req.isLoggedIn
    });
  });
};
