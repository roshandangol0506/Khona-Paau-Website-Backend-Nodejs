const mongoose = require("mongoose");

const newmyCart = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "service",
    required: true,
  },
  added_at: {
    type: Date,
    default: Date.now,
  },
});

const MyCart = mongoose.model("MyCart", newmyCart);

module.exports = MyCart;
