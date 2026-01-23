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

exports.postSignup = [
  check("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must contain only letters and spaces"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
  }),
  (req, res, next) => {
    console.log(req.body);
    res.redirect("/login");
  },
];
