const TodoItem = require("../models/TodoItem");

exports.createItems = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { title, date } = req.body;
    const todoItemData = new TodoItem({
      title,
      date,
    });
    await todoItemData.save();
    res.status(201).json(todoItemData);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getItems = async (req, res) => {
  try {
    const todoItems = await TodoItem.find().sort({ timestamp: -1 });
    res.status(200).json(todoItems);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await TodoItem.findByIdAndDelete(id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
