const http = require("http");
const PORT = 3000
const server  = http.createServer((req, res) => {
  // console.log(req);
});

server.listen(PORT , ()=>{
  console.log(`Server start at localhost:${PORT}`)
})