const express = require("express");
const {
  createItems,
  getItems,
  deleteItem,
} = require("../controller/todoItemsControllers");
const router = express.Router();

router.post("/", createItems);
router.get("/", getItems);
router.delete("/:id", deleteItem);

module.exports = router;
