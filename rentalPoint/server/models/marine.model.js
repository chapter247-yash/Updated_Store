const mongoose = require("mongoose");

var marineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Marine name can't be empty"
  },
  image: {
    type: String,
    required: "Please add image",
    data: Buffer,
  },
  description: {
    type: String,
    required: "Please add description"
  },
  price: {
    type: Number,
    required: "Price can't be empty",
    min: 100
  },
  date: {
    type: String,
    required: "Please add date"
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
    required: "Please add speed"
  },
  maxperson: {
    type: String,
    required: "Please add maxperson"
  }
});

mongoose.model("Marine", marineSchema);
