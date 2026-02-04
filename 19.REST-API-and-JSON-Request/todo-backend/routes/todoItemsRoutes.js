const express = require("express");
const { createItems } = require("../controller/todoItemsControllers");
const router = express.Router();

router.post("/", createItems);

module.exports = router;
