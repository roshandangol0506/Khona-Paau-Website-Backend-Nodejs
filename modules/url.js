const mongoose = require("mongoose");

const newCus = new mongoose.Schema(
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
    phoneno: {
      type: String,
      required: true,
    },
    dob: {
      type: String, // Change from Number to String
      required: true,
    },    
    preffered_day: {
      type: String,
      required: true,
    },
    preffered_time: {
      type: String,
      required: true,
    },
    reason_to_visit: {
      type: String,
      required: true,
    },
    new_patient:{
      type: String,
      required: true,
    },
    which_doctor:{
      type: String,
      required: true,
    },
    detail:{
      type: String,
      required: false,
    },
    general_comments:{
      type: String,
      required: false,
    }

  },
  { timestamps: true }
);

const URL = mongoose.model("url", newCus);

module.exports = URL;
