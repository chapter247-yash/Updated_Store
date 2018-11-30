const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title  can't be empty"
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
  setOn: [
    {regular: String},
    {groupOrder: String},
    {quickQuote: String},
    {uniform: String}
  ],
  design: [
    {printted: String},
    {embroidery: String},
  ],
  description: {
    type: String,
    required: "Description can't be empty"
  },
});

var categorySchema = new mongoose.Schema({
  mens: [
    {tshirt:[
      {shortSleeve: String},
      {longSleeve: String},
    ]},
    {shirt:[
      {shortSleeve: String},
      {longSleeve: String},
    ]},
    {polo:[
      {shortSleeve: String},
      {longSleeve: String},
    ]},
    {jacket:[
      {fleece: String},
      {performance: String},
    ]},
  ],
  women: [
    {tshirt:[
      {shortSleeve: String},
      {longSleeve: String},
    ]},
    {shirt:[
      {shortSleeve: String},
      {longSleeve: String},
    ]},
    {polo:[
      {shortSleeve: String},
      {longSleeve: String},
    ]},
    {jacket:[
      {fleece: String},
      {performance: String},
    ]},
  ],
});

var priceandsizeSchema = new mongoose.Schema({
  price: {
    type: String,
    required: "Price can't be empty"
  },
  size: [
    {s: String},
    {m: String},
    {l: String},
    {xl: String},
    {dxl: String},
    {txl: String},
    {ys: String},
    {ym: String},
    {yl: String},   
    {sm: String},
    {ml: String}, 
    {lxl: String}, 
  ],
  information: {
    type: String,
    required: "Description can't be empty"
  },
});

var colorandimageSchema = new mongoose.Schema({
  colorName: {
    type: String,
    required: "Color Name can't be empty"
  },
  color: {
    type: String,
    required: "Color Name can't be empty"
  },
  frontImage: {
    type: String,
    required: "Color Name can't be empty"
  },
  backImage: {
    type: String,
    required: "Color Name can't be empty"
  },
  additionalPrice: {
    type: String,
    required: "Color Name can't be empty"
  },
  size: [
    {s: String},
    {m: String},
    {l: String},
    {xl: String},
    {dxl: String},
    {txl: String},
    {ys: String},
    {ym: String},
    {yl: String},   
    {sm: String},
    {ml: String}, 
    {lxl: String}, 
  ],
  information: {
    type: String,
    required: "Description can't be empty"
  },
});

mongoose.model("Product", productSchema);
mongoose.model("ColorandImage", colorandimageSchema);
mongoose.model("Category", categorySchema);
mongoose.model("PriceandSize", priceandsizeSchema);
