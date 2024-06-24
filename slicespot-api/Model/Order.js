const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
  },
  no: {
    type: Number,
    require: true,
  },

  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },

  amount: {
    type: Number,
    require: true,
  },

  orderedAt: {
    type: Date,
    default: Date.now(),
  },

  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  items: [
    {
      type: Object,
      default: {},
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
