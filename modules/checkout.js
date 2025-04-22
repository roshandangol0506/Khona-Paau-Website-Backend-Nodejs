const mongoose = require("mongoose");

const newcheckout = new mongoose.Schema({
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
  quantity: {
    type: Number,
    required: true,
  },
  added_at: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["completed", "processing", "shipped", "cancelled"],
    default: "processing",
  },
});

const Checkout = mongoose.model("Checkout", newcheckout);

module.exports = Checkout;
