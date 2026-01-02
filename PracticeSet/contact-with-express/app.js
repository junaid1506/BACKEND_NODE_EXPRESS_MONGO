const { error } = require("console");
const express = require("express");
const app = express();
const fs = require("fs");

// app.use("/", (req, res, next) s=> {
//   console.log(req.url, req.method);
//   next();
// });
// app.use("/test", (req, res, next) => {
//   console.log(req.url, req.method);
//   next();
// });

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  console.log(req.url, req.method);
  res.send(`<h1>Welcome to our website</h1>
            <a href='/contact-us'>Go to contact page </a>
    `);
});
app.get("/contact-us", (req, res, next) => {
  console.log(req.url, req.method);
  res.send(`
    <form action="/contact-us" method="POST">
  <label for="name">Name:</label><br>
  <input type="text" id="name" name="name" required><br><br>

  <label for="email">Email:</label><br>
  <input type="email" id="email" name="email" required><br><br>

  <label for="post">Post:</label><br>
  <textarea id="post" name="post" rows="5" required></textarea><br><br>

  <button type="submit">Submit</button>
</form>

    `);
});

app.post("/contact-us", (req, res, next) => {
  console.log(req.body);
  fs.writeFile("user.txt", JSON.stringify(req.body), () => {
    console.log(error);
    console.log("data written succesfully");
  });
  // res.send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running in port 300");
});
