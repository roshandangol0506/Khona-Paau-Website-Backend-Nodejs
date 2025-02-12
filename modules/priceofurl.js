const mongoose = require("mongoose");

const newprice = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    endDate: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const PriceofUrl = mongoose.model("priceofurl", newprice);

module.exports = PriceofUrl;
