const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
  res.send(`<h1>Hello</h1>`);
  next();
});
// app.get("/", (req, res, next) => {
//   res.send(`<h1>New</h1>`);
// });

app.listen(3000, () => {
  console.log("app is running ");
});
