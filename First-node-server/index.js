const http = require("http");
const PORT = 3000;
const server = http.createServer((req, res) => {
  // console.log(req.url, req.method, req.headers);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Junaid Ansari</title></head>");
    res.write("<body><h1>Hello Mere Bhai Junaid</h1></body>");
    res.write("</html>");
    return res.end();
  }
  else if(req.url === '/products'){
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Products</title></head>");
    res.write("<body><h1>Products Page</h1></body>");
    res.write("</html>");
    return res.end();  
  }
  res.end()
});

server.listen(PORT, () => {
  console.log(`Server start at localhost:${PORT}`);
});