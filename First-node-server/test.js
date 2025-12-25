const http =  require('http')

const server = http.createServer((req,res)=>{
  res.write(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Myntra Style Navbar</title>

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Arial, Helvetica, sans-serif;
}

.navbar{
  width:100%;
  height:70px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 40px;
  border-bottom:1px solid #eee;
}

.logo{
  font-size:24px;
  font-weight:700;
  color:#ff3f6c;
  letter-spacing:1px;
}

.menu{
  display:flex;
  gap:25px;
  font-size:14px;
  font-weight:600;
}

.menu a{
  text-decoration:none;
  color:#000;
}

.menu a:hover{
  color:#ff3f6c;
}

.search-box{
  flex:1;
  max-width:350px;
  margin:0 30px;
  display:flex;
  align-items:center;
  border:1px solid #ccc;
  border-radius:4px;
  padding:7px 10px;
}

.search-box input{
  width:100%;
  border:none;
  outline:none;
  font-size:14px;
}

.right-icons{
  display:flex;
  gap:25px;
  font-size:13px;
  text-align:center;
  cursor:pointer;
}

.icon{
  display:flex;
  flex-direction:column;
  align-items:center;
}

@media (max-width:900px){
  .menu{
    display:none;
  }
  .search-box{
    max-width:220px;
  }
}

</style>
</head>

<body>

<header class="navbar">

  <div class="logo">MYNTRA</div>

  <nav class="menu">
    <a href="#">MEN</a>
    <a href="#">WOMEN</a>
    <a href="#">KIDS</a>
    <a href="#">HOME & LIVING</a>
    <a href="#">BEAUTY</a>
    <a href="#">STUDIO</a>
  </nav>

  <div class="search-box">
    🔍
    <input type="text" placeholder="Search for products, brands and more">
  </div>

</header>
  
  <h1>Welcome to Home </h1>
  

</body>
</html>
`)
  res.end()
})

server.listen(3000,()=>{
  
  console.log("Server is running")
}) 

