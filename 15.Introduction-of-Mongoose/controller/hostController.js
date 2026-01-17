const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/editHome", {
    pageTitle: "Register Your Home",
    editing: false,
  });
};

exports.getHostHomeList = (req, res, next) => {
  Home.fetchAll().then((registerHomes) => {
    res.render("host/hostHomeList", {
      registerHomes: registerHomes,
      pageTitle: "airbnb Host-Home-list",
    });
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then((home) => {
    console.log(home);
    if (!home) {
      return res.redirect("/host-home-list");
    }
    // console.log(homeId, editing, home);
    res.render("host/editHome", {
      pageTitle: "Edit Your Home",
      editing: editing,
      home: home,
    });
  });
};
exports.postAddHome = (req, res, next) => {
  const { name, location, price, rating, description, imageUrl } = req.body;
  const home = new Home(name, location, price, rating, description, imageUrl);

  home.save();
  res.render("host/successMsg", { pageTitle: "Home Registered Successfully" });
};
exports.postEditHome = (req, res, next) => {
  const { homeName, location, price, rating, description, imageUrl, id } =
    req.body;
  console.log(req.body);
  const home = new Home(
    homeName,
    location,
    price,
    rating,
    description,
    imageUrl,
    id
  );

  home
    .save()
    .then(() => {
      res.redirect("/host-home-list");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.deleteById(homeId)
    .then(() => {
      res.redirect("/host-home-list");
    })
    .catch((err) => console.log(err));
};
