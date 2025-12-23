const fs = require('fs')
fs.writeFile("index.html","<h1>Hello</h1>" , (err)=>{
  if(err){
    console.log(err)
  }else{
    console.log("File Written Succesfully")
  }
})