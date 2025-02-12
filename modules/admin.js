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
      required: true,
    },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

const Admin = mongoose.model("admin", newUser);

module.exports = Admin;
