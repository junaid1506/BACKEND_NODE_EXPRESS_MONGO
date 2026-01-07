
exports.getAddHome = (req, res, next) => {
  res.render("addHome", { pageTitle: "Register Your Home" });
};

exports.postAddHome = (req, res, next) => {
  registerHomes.push({
    houseName: req.body.houseName,
    localion: req.body.location,
    price: req.body.price,
  });
  // console.log(registerHomes);

  res.render("successMsg", { pageTitle: "Home Registered Successfully" });
};

exports.getHome = (req, res, next) => {
  console.log(registerHomes);
  res.render("home", {
    registerHomes: registerHomes,
    pageTitle: "airbnb Home",
  });
};
