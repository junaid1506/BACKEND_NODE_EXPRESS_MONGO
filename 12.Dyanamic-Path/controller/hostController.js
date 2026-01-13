const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/editHome", {
    pageTitle: "Register Your Home",
    editing: false,
  });
};

exports.getHostHomeList = (req, res, next) => {
  Home.fetchAll((registerHomes) => {
    res.render("host/hostHomeList", {
      registerHomes: registerHomes,
      pageTitle: "airbnb Host-Home-list",
    });
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId, (home) => {
    if (!home) {
      return res.redirect("/host-home-list");
    }
    console.log(homeId, editing, home);
    res.render("host/editHome", {
      pageTitle: "Edit Your Home",
      editing: editing,
      home: home,
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
