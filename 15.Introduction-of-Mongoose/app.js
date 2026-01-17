// Core module
const path = require("path");
// external Modules
const express = require("express");
const mongoose = require("mongoose");
// routes
//controllers
const { get404 } = require("./controller/error");

const storeRoutes = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtils");

const app = express();

// ejs
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());

app.use(express.static(path.join(rootDir, "public")));

app.use(storeRoutes);
app.use(hostRouter);

// app.use(express.static(path.join(rootDir, "public")));

app.use(get404);

const PORT = 3000;

mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.mmtvrxq.mongodb.net/airbnb?appName=Cluster0"
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
