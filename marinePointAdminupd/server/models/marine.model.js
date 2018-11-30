const mongoose = require("mongoose");

var marineSchema = new mongoose.Schema({
  model: {
    type: String,
    required: "Marine name can't be empty"
  },
  image: {
    type: String,
    required: "Please add description"
  },
  description: {
    type: String,
    required: "Please add description"
  },
  date: {
    type: String,
    required: "Please add date"
  },
  // time: {
  //   type: String,
  //   required: "Please add time"
  // },
  price: {
    type: String,
    required: "Price can't be empty",
  },
  size: {
    type: String,
    required: "Please add size"
  },
  speed: {
    type: String,
    required: "Please add speed"
  },
  engine: {
    type: String,
    required: "Please add engine"
  },
  maxperson: {
    type: String,
    required: "Please add maxperson"
  }
});

mongoose.model("Marine", marineSchema);
