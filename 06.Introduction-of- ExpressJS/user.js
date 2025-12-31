const { error } = require("console");
const fs = require("fs");

const userRequestHandler = (req, res) => {
  if (req.url === "/") {
    res.write(`
      <!DOCTYPE html>
         <html>
            <head>
              <title>User Form</title>
              
              <style>
              
              *{
                box-sizing:border-box;
              }
              
              body{
                margin:0;
                font-family: Poppins, Arial;
                background: linear-gradient(135deg,#667eea,#764ba2);
                height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
              }
              
              .card{
                background: rgba(255,255,255,0.95);
                padding:30px 35px;
                width:350px;
                border-radius:18px;
                box-shadow:0 15px 40px rgba(0,0,0,0.2);
                animation: fadeIn .4s ease;
              }
              
              @keyframes fadeIn{
                from{opacity:0; transform:translateY(20px);}
                to{opacity:1; transform:translateY(0);}
              }
              
              .card h2{
                text-align:center;
                margin-bottom:20px;
                color:#333;
              }
              
              label{
                font-weight:600;
                color:#444;
              }
              
              input, select{
                width:100%;
                padding:10px;
                border-radius:8px;
                border:1px solid #ccc;
                margin-top:5px;
                margin-bottom:12px;
                font-size:14px;
              }
              
              input:focus, select:focus{
                outline:none;
                border-color:#667eea;
                box-shadow:0 0 5px rgba(102,126,234,.6);
              }
              
              button{
                width:100%;
                padding:10px;
                border:none;
                border-radius:8px;
                background:#667eea;
                color:white;
                font-size:16px;
                font-weight:600;
                cursor:pointer;
                transition:0.2s;
              }
              
              button:hover{
                background:#5464d6;
                transform: translateY(-1px);
              }
              
              .footer{
                text-align:center;
                margin-top:10px;
                font-size:12px;
                color:#555;
              }
              
              </style>
            </head>              
        <body>
              
              <div class="card">
                <h2>User Details</h2>
              
                <form action="/submit" method="POST">
              
                  <label>Name</label>
                  <input type="text" name="name" placeholder="Enter your name" required>
              
                  <label>Age</label>
                  <input type="number" name="age" min="1" placeholder="Enter your age" required>
              
                  <label>Gender</label>
                  <select name="gender" required>
                    <option value="">Choose Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
              
                  <button type="submit">Submit</button>
              
                </form>
              
                <div class="footer">Made with Node.js</div>
              </div>              
        </body>
   </html>`);

    return res.end();
  } else if (req.url.toLowerCase() === "/submit" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const bodyObj = Buffer.concat(body).toString();
      const params = new URLSearchParams(bodyObj);
      const fullBody = Object.fromEntries(params);
      fs.writeFile("user.txt", JSON.stringify(fullBody), (error) => {
        console.log("data written succesfully");
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1> 404 Page Not Found </h1>");
  } 
};

module.exports = userRequestHandler;
