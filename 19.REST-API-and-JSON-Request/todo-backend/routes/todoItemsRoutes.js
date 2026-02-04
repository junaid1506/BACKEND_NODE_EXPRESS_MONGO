const express = require("express");
const { create } = require("../models/TodoItem");
const router = express.Router();

router.post("/", create);

module.exports = router;
