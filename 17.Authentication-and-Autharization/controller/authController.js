exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login",
    // isloggedIn: false,
    isLoggedIn: false,
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

exports.getSignup = (req, res) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    // isloggedIn: false,
    isLoggedIn: false,
  });
};

exports.postSignup = (req, res) => {
  console.log(req.body);
  res.redirect("/login");
};
