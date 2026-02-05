const express = require("express");
const { createItems, getItems } = require("../controller/todoItemsControllers");
const router = express.Router();

router.post("/", createItems);
router.get("/", getItems);

module.exports = router;
