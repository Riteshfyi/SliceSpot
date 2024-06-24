const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  image: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Pizza", pizzaSchema);
