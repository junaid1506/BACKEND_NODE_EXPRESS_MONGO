const express = require("express");
const hostRouter = express.Router();
hostRouter.get("/host/add-home", (req, res, next) => {
  res.send(`<h1>Register Home</h1>
      <form action='/add-home' method='POST'>
      <input type='text' name='houseName' placeholder='Enter Your House Name' />
      <input type='submit'/>
      </form>
    `);
});
hostRouter.post("/host/add-home", (req, res, next) => {
  console.log(req.body);
  res.send(`<h1>Home Register Succesfully</h1>
         <a href=''>Go to Home </a>
    `);
});

module.exports = hostRouter;
