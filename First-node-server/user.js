const http = require("http");
const fs = require("fs");
const PORT = 3000;
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Junaid Ansari</title></head>");
    res.write("<body><h1>Enter Your Details</h1></body>");
    res.write("<form action='/user' method='POST'>");
    res.write(
      "<input type='text' name='username' placeholder='Enter Username'/> <br/> <br/>"
    );
    res.write("<lable for='male'>Male</lable>");
    res.write("<input type='radio' id='male' name='gender' value='male'/>");
    res.write("<lable for='female'>Female</lable>");
    res.write(
      "<input type='radio' id='female' name='gender' value='female'/> <br/> <br/> <br/>"
    );
    res.write("<button type='submit'>Submit</button>");
    res.write("</form>");
    res.write("</html>");
    return res.end();
  } else if (req.url.toLowerCase() === "/user" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);
      const params = new URLSearchParams(fullBody);
      // const bodyObj = {};
      // for (const [key, val] of params.entries()) {
      //   bodyObj[key] = val;
      // }

      const bodyObj = Object.fromEntries(params);
      console.log(bodyObj);
      fs.writeFileSync("user.txt", JSON.stringify(bodyObj));
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  } else if (req.url === "/products") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Products</title></head>");
    res.write("<body><h1>Products Page</h1></body>");
    res.write("</html>");
    return res.end();
  }
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server start at localhost:${PORT}`);
});
