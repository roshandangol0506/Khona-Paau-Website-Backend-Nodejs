const mongoose = require("mongoose");

const newUser = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneno: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    twoFactorialAuthentication: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    sessionManagement: {
      type: Number,
      required: true,
    },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

const Admin = mongoose.model("admin", newUser);

module.exports = Admin;
