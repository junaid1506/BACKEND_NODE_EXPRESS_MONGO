const routing = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<h1>Welcome Home </h1>
              <a href='/calculator'>Go to Calculator Page 
      `);
    return res.end();
  } else if (req.url === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <!DOCTYPE html>
<html>
<head>
  <title>Add Two Numbers</title>
  <style>
    body{
      font-family: Arial;
      background:#f4f4f4;
      display:flex;
      justify-content:center;
      align-items:center;
      height:100vh;
    }
    .box{
      background:white;
      padding:20px 30px;
      border-radius:10px;
      box-shadow:0 0 10px rgba(0,0,0,0.2);
    }
    input{
      width:100%;
      padding:8px;
      margin:8px 0;
      border-radius:5px;
      border:1px solid #ccc;
      font-size:16px;
    }
    button{
      width:100%;
      padding:10px;
      border:none;
      border-radius:5px;
      font-size:16px;
      background:#007bff;
      color:white;
      cursor:pointer;
    }
  </style>
</head>
<body>

<div class="box">
  <h2>Add Two Numbers</h2>
  <form method='POST' action='/result'>
    <input type="number" name='num1' placeholder="First Number">
    <input type="number" name='num2' placeholder="Second Number">
    <button type="submit">Add</button>
  </form>
</div>

</body>
</html>
`);
    return res.end();
  } else if (req.url === "/result") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log(chunk);
    });
    req.on("end", () => {
      const bodyObj = Buffer.concat(body).toString();
      const fullbody = new URLSearchParams(bodyObj);
      const fullBodyObj = Object.fromEntries(fullbody);
      const totalNum = Number(fullBodyObj.num1) + Number(fullBodyObj.num2);
      console.log(totalNum);
      res.write(`<h1>Your Result is :- ${totalNum}</h1>
        <a href='/'>Go Back to Home Page</a>`);
      res.end();
    });
  }
};

module.exports = routing;