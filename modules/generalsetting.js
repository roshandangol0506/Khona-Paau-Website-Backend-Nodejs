const mongoose = require("mongoose");

const newgeneralsetting = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: "680731dc89bdf730b095ecfd",
    },
    name: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      enum: ["rs", "usd", "eur", "jyp"],
      default: "rs",
    },
    timezone: {
      type: String,
      enum: ["kathmandu", "america", "australia", "india"],
      default: "kathmandu",
    },
    maintenance_mode: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
  },
  { timestamps: true }
);

const General_Setting = mongoose.model("generalsetting", newgeneralsetting);

module.exports = General_Setting;
