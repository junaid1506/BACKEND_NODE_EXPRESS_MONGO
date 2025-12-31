const http = require("http");
// const { testingSyntax } = require("./syntax");
// const { runtime } = require("./runtime");
const { logical } = require("./logical");

const PORT = 3001;
const server = http.createServer(logical);

server.listen(PORT, () => {
  console.log("server is running");
});