exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login",
    // isloggedIn: false,
    isLoggedIn: req.session.isLoggedIn,
  });
};
exports.postLogin = (req, res) => {
  // res.cookie("isLoggedIn", true); // ✅ correct
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
