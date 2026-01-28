const bcrypt = require("bcryptjs");
const { validationResult, check } = require("express-validator");
const User = require("../models/user");
exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login",
    // isloggedIn: false,
    isLoggedIn: false,
  });
};
exports.postLogin = (req, res) => {
  console.log(req.body);
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
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),

  check("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  check("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["Guest", "Host"]) // Capitalized to match dropdown values
    .withMessage("Invalid role selected"),

  check("terms")
    .equals("on")
    .withMessage("You must accept the terms and conditions"),

  (req, res, next) => {
    const { name, email, password, confirmPassword, role } = req.body;
    const errors = validationResult(req);
    // console.log(errors.array());
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        // isloggedIn: false, ✅ FIXED CASE
        isLoggedIn: false,
        errorMessages: errors.array(),
        oldInput: {
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          role: role,
        },
      });
    }

    bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      });
      user
        .save()
        .then(() => {
          res.redirect("/login");
        })
        .catch((err) => {
          return res.status(422).render("auth/signup", {
            pageTitle: "Signup",
            // isloggedIn: false, ✅ FIXED CASE
            isLoggedIn: false,
            errorMessages: errors.array(),
            oldInput: {
              name: name,
              email: email,
              password: password,
              confirmPassword: confirmPassword,
              role: role,
            },
          });
        });
    });
  },
];
