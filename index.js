const fs = require('fs')
fs.writeFile("Output.txt","Junaid Ansari" , (err)=>{
  if(err){
    console.log(err)
  }else{
    console.log("File Written Succesfully")
  }
})