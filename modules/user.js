const mongoose = require("mongoose");

const newUser = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    profile: {
      type: String,
    },
    location: {
      type: String,
    },
    phoneno: {
      type: String,
    },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

const User = mongoose.model("user", newUser);

module.exports = User;
