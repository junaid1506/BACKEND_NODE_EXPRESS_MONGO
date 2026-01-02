const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
  console.log(req.url, req.method);
  next();
});
app.use("/test", (req, res, next) => {
  console.log(req.url, req.method);
  next();
});
app.get("/", (req, res, next) => {
  console.log(req.url, req.method);
  res.send(`<h1>Welcome to our website</h1>
            <a href='/contact-us'>Go to contact page </a>
    `);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running in port 300");
});
