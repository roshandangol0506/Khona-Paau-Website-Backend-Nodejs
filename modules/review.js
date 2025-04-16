const mongoose = require("mongoose");

const newreview = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    profilepic: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);

const REVIEW = mongoose.model("review", newreview);

module.exports = REVIEW;
