const http = require("http");
const routing = require("./routing");
const PORT = 3000;

const server = http.createServer(routing);

server.listen(PORT, () => {
  console.log("Server is running properly");
});