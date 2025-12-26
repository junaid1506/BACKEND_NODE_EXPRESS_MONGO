const http = require("http");
const fs = require("fs");
const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  res.setHeader("Content-Type", "text/html");

  if (req.url === "/") {
    res.write(`
    <!DOCTYPE html>
<html>
<head>
  <title>Styled Form</title>

  <style>
    body{
      font-family: Arial;
      background:#f4f4f4;
      display:flex;
      justify-content:center;
      align-items:center;
      height:100vh;
    }

    .form-box{
      background:white;
      padding:20px 30px;
      border-radius:10px;
      box-shadow:0 0 15px rgba(0,0,0,0.1);
      width:300px;
    }

    .form-box h2{
      text-align:center;
    }

    label{
      font-weight:bold;
    }

    input, button{
      width:100%;
      padding:8px;
      margin:8px 0;
    }

    button{
      background:#007bff;
      color:white;
      border:none;
      border-radius:5px;
      cursor:pointer;
    }

    button:hover{
      background:#0056b3;
    }
  </style>
</head>

<body>

  <div class="form-box">
    <h2>User Form</h2>

    <form action="/submit" method="POST">

      <label>Name:</label>
      <input type="text" name="name" required>

      <label>Age:</label>
      <input type="number" name="age" required>

      <label>Gender:</label>
      <select name="gender" required>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <button type="submit">Submit</button>

    </form>
  </div>

</body>
</html>

    
    
    `);
    return res.end();
  } else if (req.url.toLowerCase() === "/submit" && req.method === "POST") {
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
});

server.listen(PORT, () => {
  console.log(`server run on https://localhost${PORT}`);
});
