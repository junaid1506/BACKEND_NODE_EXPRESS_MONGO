// external Modules
const express = require("express");
// routes
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");

const app = express();

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

app.use((req, res, next) => {
  res.status(404).send(`<h1>Page is not found</h1>
      <a href='/'>Back to Home</a>`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on localhost 3000");
});
