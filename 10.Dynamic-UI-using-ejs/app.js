// Core module
const path = require("path");
// external Modules
const express = require("express");
// routes

const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtils");

const app = express();

// ejs
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());

app.use(express.static(path.join(rootDir, "public")));

app.use(userRouter);
app.use(hostRouter);

// app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on localhost 3000");
});
