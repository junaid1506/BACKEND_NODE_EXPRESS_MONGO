const express = require("express");
const path = require("path");
const pathDir = require("./utils/pathUtils");
const homeRoutes = require("./routes/homeRoutes");
const contactUsRoutes = require("./routes/contactUsRoutes");
const app = express();

app.use(express.urlencoded());
app.use(homeRoutes);
app.use(contactUsRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(pathDir, "views", "404.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running in port 300");
});
