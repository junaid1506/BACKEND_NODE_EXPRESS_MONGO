// Core module
const path = require("path");
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
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on localhost 3000");
});
