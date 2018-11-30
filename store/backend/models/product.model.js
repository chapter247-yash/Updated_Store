const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name  can't be empty"
  },
  brandName: {
    type: String,
    required: "Brand Name can't be empty"
  },
  itemNo: {
    type: String,
    required: "Item No can't be empty"
  },
  supplierName: {
    type: String,
    required: "Supplier name can't be empty"
  },
  weight: {
    type: String,
    required: "Weight can't be empty"
  },
  weightq: {
    type: String,
  },
  quantity: {
    type: String,
  },
  remainingQuantity : String,
  new: String,
  sale: String,
  percentage: String,
  regular: String,
  groupOrder: String,
  quickQuote: String,
  uniform: String,
  printted: String,
  embroidery: String,
  description: String,

  price: String,
  ssize: String,
  msize: String,
  lsize: String,
  xlsize: String,
  information1: String,
  information2: String,

  colorName: [String],
  colorCode: [String],
  additionalPrice:[],
  frontImage: {
    type: [String],
  },
  frontThumb: {
    type: [String],
  },
  backImage:{
    type:[String],
  },
  backThumb:{
    type: [String],
  },
  rightImage:{
    type:[String],
  },
  rightThumb:{
    type: [String],
  },
  leftImage:{
    type: [String],
  },
  leftThumb:{
    type: [String],
  },
  created_at: {
    type: Date,
    default: Date.now()
  },

  men: String,
  women: String,
  m_ts_shortSleeve: String,
  m_ts_longSleeve: String,
  m_ts_performance: String,
  m_sh_shortSleeve: String,
  m_sh_longSleeve: String,
  m_sh_performance: String,
  m_po_shortSleeve: String,
  m_po_longSleeve: String,
  w_ts_shortSleeve: String,
  w_ts_longSleeve: String,
  w_ts_performance: String,
  w_sh_shortSleeve: String,
  w_sh_longSleeve: String,
  w_po_shortSleeve: String,
  w_po_longSleeve: String,

  status: String
});

mongoose.model("Product", productSchema);
