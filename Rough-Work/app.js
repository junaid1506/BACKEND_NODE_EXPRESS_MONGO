//core
const path = require("path");
// external
const express = require("express");
// local
const homeRoute = require("./routes/homeRoute");
const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const contactUsRoute = require("./routes/contactUsRoute");

const pathDir = require("./utils/pathUtils");

const app = express();

app.use(express.static(path.join(pathDir, "public")));
app.use(express.urlencoded());
app.use(homeRoute);
app.use(loginRoute);
app.use(registerRoute);
app.use(contactUsRoute);

app.use((req, res, next) => {
  res.sendFile(path.join(pathDir, "views", "404.html"));
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log("My server is running on localhost 3000");
});
