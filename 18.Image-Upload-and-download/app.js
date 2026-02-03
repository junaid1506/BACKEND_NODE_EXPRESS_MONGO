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

const app = express();
const rootDir = require("./utils/pathUtils");
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

/* -------------------- RANDOM NAME -------------------- */
const randomString = (length) => {
  let result = "";
  const chars = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/* -------------------- MULTER FIX -------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // ✅ Absolute path (IMPORTANT FIX)
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

const multerOptions = multer({
  storage,
  fileFilter,
});

/* -------------------- MIDDLEWARE -------------------- */

app.use(multer(multerOptions).single("image"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "jndtech",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);

/* -------------------- STATIC FILES (FIXED) -------------------- */

app.use(express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/host/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/homes/uploads", express.static(path.join(rootDir, "uploads")));

/* -------------------- AUTH STATE -------------------- */

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

/* -------------------- ROUTES -------------------- */

app.use(authRouter);
app.use(storeRoutes);

/* -------------------- PROTECTED -------------------- */

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
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });
