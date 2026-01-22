exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login",
    isloggedIn: false,
    isLoggedIn: req.isLoggedIn,
  });
};
exports.postLogin = (req, res) => {
  // res.cookie("isLoggedIn", true); // ✅ correct
  req.session.isloggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res) => {
  // req.session.isloggedIn = false;
  res.redirect("/login");
};
