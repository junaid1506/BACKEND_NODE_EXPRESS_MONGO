exports.createItems = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { title, date, completed } = req.body;
    const todoItemData = new TodoItem({
      title,
      date,
      completed,
    });
    await todoItemData.save();
    res.status(201).json(todoItemData);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
