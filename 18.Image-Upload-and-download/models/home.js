const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  homeName: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  description: String,
  image: String,
});

module.exports = mongoose.model("Home", homeSchema);

// save
// fetchAll
// findById
// deleteById
