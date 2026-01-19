exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login",
    isloggedIn: false,
    isLoggedIn: req.isLoggedIn,
  });
};
exports.postLogin = (req, res) => {
  console.log(req.body);
  res.redirect("/host-home-list");
  req.isloggedIn = true;
};
