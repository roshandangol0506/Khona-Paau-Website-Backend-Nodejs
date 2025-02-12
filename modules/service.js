const mongoose = require("mongoose");

const newservice = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    visible: {
      type: String,
      enum: ["on", "off"],
      default: "on",
    },
  },
  { timestamps: true }
);

const SERVICE = mongoose.model("service", newservice);

module.exports = SERVICE;
