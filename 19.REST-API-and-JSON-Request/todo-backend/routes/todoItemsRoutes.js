const express = require("express");
const {
  createItems,
  getItems,
  deleteItem,
  getCompleteItem,
} = require("../controller/todoItemsControllers");
const router = express.Router();

router.post("/", createItems);
router.get("/", getItems);
router.delete("/:id", deleteItem);
router.put("/complete/:id", getCompleteItem);

module.exports = router;
