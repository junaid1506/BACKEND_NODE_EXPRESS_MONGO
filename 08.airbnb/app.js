// external Modules
const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});
app.get("/", (req, res, next) => {
  res.send(`<h1>Welcome to airbnb</h1>
      <a href='/add-home'>Add Home </a>
    `);
});
app.get("/add-home", (req, res, next) => {
  res.send(`<h1>Welcome to airbnb</h1>
      <a href='/add-home'>Add Home </a>
    `);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on localhost 3000");
});
