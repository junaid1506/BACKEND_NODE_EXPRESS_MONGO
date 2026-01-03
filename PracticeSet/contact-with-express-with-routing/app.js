const express = require("express");
const path = require("path");
const pathDir = require("./utils/pathUtils");
const userRouter = require("./routes/userRoutes");
const app = express();

app.use(express.urlencoded());
app.use(userRouter);
app.use((req, res, next) => {
  res.sendFile(path.join(pathDir, "views", "404.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running in port 300");
});
