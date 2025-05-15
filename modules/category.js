const mongoose = require("mongoose");

const newCategory = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("category", newCategory);

module.exports = Category;
