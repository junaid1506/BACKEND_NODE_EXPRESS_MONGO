// Core modules
const path = require("path");

// External modules
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const rootDir = require("./utils/pathUtils");
const { get404 } = require("./controller/error");
/* -------------------- VIEW ENGINE -------------------- */

// routes
const todoItemsRoutes = require("./routes/todoItemsRoutes");

app.set("view engine", "ejs");
app.set("views", "views");

/* -------------------- DATABASE -------------------- */
const DB_PATH =
  "mongodb+srv://root:root@cluster0.mmtvrxq.mongodb.net/todo?appName=Cluster0";
/* -------------------- STATIC FILES (FIXED) -------------------- */

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// apis

app.use(todoItemsRoutes );

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
