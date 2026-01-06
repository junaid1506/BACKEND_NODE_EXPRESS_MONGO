// Core module
const path = require("path");
// external Modules
const express = require("express");
// routes
//controllers

const { get404 } = require("./controller/error");

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

app.use(get404);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on localhost 3000");
});
