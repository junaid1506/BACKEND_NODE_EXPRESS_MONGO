const http = require("http");
const fs = require('fs');
const PORT = 3000;
const server = http.createServer((req, res) => {
  // console.log(req.url, req.method, req.headers);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Junaid Ansari</title></head>");
    res.write("<body><h1>Enter Your Details</h1></body>");
    res.write("<form action='/user' method='POST'>");
    res.write("<input type='text' name='username' placeholder='Enter Username'/> <br/> <br/>");
    res.write("<lable for='male'>Male</lable>");
    res.write("<input type='radio' id='male' name='gender' value='male'/>");
    res.write("<lable for='female'>Female</lable>");
    res.write("<input type='radio' id='female' name='gender' value='female'/> <br/> <br/> <br/>");
    res.write("<button type='submit'>Submit</button>");
    res.write("</form>")
    res.write("</html>");
    return res.end();
  } else if(req.url.toLowerCase() === '/user' && req.method === 'POST'){
    fs.writeFileSync('user.txt', 'Username and Gender submitted');
    res.statusCode = 302;
    res.setHeader('Location', '/');
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