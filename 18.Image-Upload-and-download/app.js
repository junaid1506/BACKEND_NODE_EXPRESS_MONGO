// Core modules
const path = require("path");

// External modules
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");

// Routes / Controllers
const { get404 } = require("./controller/error");
const storeRoutes = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtils");

const app = express();

/* -------------------- VIEW ENGINE -------------------- */
app.set("view engine", "ejs");
app.set("views", "views");

/* -------------------- DATABASE -------------------- */
const DB_PATH =
  "mongodb+srv://root:root@cluster0.mmtvrxq.mongodb.net/airbnb?appName=Cluster0";

/* -------------------- SESSION STORE -------------------- */
const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});

/* -------------------- MIDDLEWARE -------------------- */
const randomString = (length) => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const multerOptions = {
  storage,
  fileFilter,
};

app.use(multer(multerOptions).single("image")); // For handling multipart/form-data (file uploads)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "jndtech",
    resave: false,
    saveUninitialized: false, // ✅ FIXED
    store: store,
    cookie: {
      httpOnly: true,
      secure: false, // set true only when using HTTPS
    },
  }),
);

/* -------------------- STATIC FILES -------------------- */
app.use(express.static(path.join(rootDir, "public")));

/* -------------------- AUTH STATE MIDDLEWARE -------------------- */
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn; // ✅ FIXED CASE
  next();
});

/* -------------------- ROUTES -------------------- */
app.use(authRouter);
app.use(storeRoutes);

/* -------------------- PROTECTED ROUTES -------------------- */
app.use((req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});

app.use(hostRouter);

/* -------------------- 404 -------------------- */
app.use(get404);

/* -------------------- SERVER -------------------- */
const PORT = 3000;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB using Mongoose");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
