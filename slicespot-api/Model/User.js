const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    lowercase:true
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Customer"],
    default:"Customer"
  },

  cartData:[
    {
      type:Object,
      default:{}
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
