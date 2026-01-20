// Core module
const path = require("path");
// external Modules
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
// routes
//controllers
const { get404 } = require("./controller/error");

const storeRoutes = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtils");

const app = express();

// ejs
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(
  session({
    secret: "jndtech",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  // console.log("Cookie Check Middleware", req.get("Cookie"));
  req.isLoggedIn = req.get("Cookie")
    ? req.get("Cookie").split("=")[1] === "true"
    : false;
  next();
});

app.use(authRouter);
app.use(storeRoutes);
app.use((req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use(hostRouter);

// app.use(express.static(path.join(rootDir, "public")));

app.use(get404);

const PORT = 3000;

mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.mmtvrxq.mongodb.net/airbnb?appName=Cluster0",
  )
  .then(() => {
    console.log("Connected to MongoDB using Mongoose");
    app.listen(PORT, () => {
      console.log("Server is running on localhost 3000");
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
