exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login",
    isloggedIn: false,
    isLoggedIn: req.isLoggedIn,
  });
};
exports.postLogin = (req, res) => {
  res.cookie("isLoggedIn", true); // ✅ correct
  res.redirect("/");
};

exports.postLogout = (req, res) => {
  res.cookie("isLoggedIn", false); // ✅ correct
  res.redirect("/login");
};