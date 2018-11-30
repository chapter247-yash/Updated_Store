const mongoose = require("mongoose");
var ObjectId = require("mongoose").Types.ObjectId;
const Product = mongoose.model("Product");
const User = mongoose.model("User");
const passport = require('passport');
const _ = require('lodash');

module.exports.userRegister = (req, res, next) => {
  console.log(req.body)
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save((err, user) => {
    if (!err) {
      res.send(user);
      //nodemail.email(user.name, user.email, user.password);
    } else {
      console.log(err);
      if (err.code == 11000)
        res.status(422).send(["Email Address already exist."]);
      else return next(err);
    }
  });
};

module.exports.userAuthenticate = (req, res) => {
  // call for passport authentication
  passport.authenticate("local", (err, user, info) => {
    // error from passport middleware
    if (err) return res.status(400).json(err);
    // registered user
    else if (user) return res.status(200).json({ token: user.generateJwt() });
    // unknown user or wrong password
    else return res.status(404).json(info);
  })(req, res);
};

module.exports.userProfile = (req, res) => {
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    else
      return res
        .status(200)
        .json({ status: true, user: _.pick(user, ["name", "email"]) });
  });
};

module.exports.allUser = (req, res) => {
  User.find((err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "No registered user" });
    else return res.status(200).json({ user: user });
  });
};


module.exports.getProduct = async (req, res) => {
  try {
    let response = await Product.find().sort({created_at: -1});
    if (response.err)
      return res
        .status(404)
        .json({ status: false, message: "Failed to retrive details" });
    else return res.status(200).json({ response: response });
  } catch (error) {}
};

module.exports.getProductNew = async (req, res) => {
  try {
    let response = await Product.find().sort({created_at: -1});
    if (response.err)
      return res
        .status(404)
        .json({ status: false, message: "Failed to retrive details" });
    else return res.status(200).json({ response: response });
  } catch (error) {}
};

module.exports.getProductOld = async (req, res) => {
  try {
    let response = await Product.find().sort({created_at: 1});
    if (response.err)
      return res
        .status(404)
        .json({ status: false, message: "Failed to retrive details" });
    else return res.status(200).json({ response: response });
  } catch (error) {}
};

module.exports.getProductA = async (req, res) => {
  try {
    let response = await Product.find().sort({name: 1});
    if (response.err)
      return res
        .status(404)
        .json({ status: false, message: "Failed to retrive details" });
    else return res.status(200).json({ response: response });
  } catch (error) {}
};

module.exports.getProductZ = async (req, res) => {
  try {
    let response = await Product.find().sort({name: -1});
    if (response.err)
      return res
        .status(404)
        .json({ status: false, message: "Failed to retrive details" });
    else return res.status(200).json({ response: response });
  } catch (error) {}
};

module.exports.getbyIdProduct = async (req, res) => {
  console.log(req.params.id);
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).json(`No marine with given id : ${req.params.id}`);

  let response = await Product.findById({ _id: req.params.id });
  if (response.err)
    return res
      .status(404)
      .json({ status: false, message: "Failed to retrive details" });
  else return res.status(200).json({ response: response });
};

module.exports.getbyitemNoProduct = async (req, res) => {
  console.log(req.params.itemNo);
  if (req.params.itemNo !== "0") {
    let response = await Product.find({
      $or: [
        { brandName: {$regex: new RegExp ("^" + req.params.itemNo.toLowerCase(),'i')}},
        { itemNo: req.params.itemNo },
        { name: {$regex: new RegExp ("^" + req.params.itemNo.toLowerCase(),'i')}},
      ]
    });
    if (response.err)
      return res
        .status(404)
        .json({ status: false, message: "Failed to retrive details" });
    else return res.status(200).json({ response: response });
  } else {
    return res
      .status(404)
      .json({ status: false, message: "Failed to retrive details" });
  }
};

module.exports.deletebyIdProduct = async (req, res) => {
  console.log(req.params.id);
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).json(`No product with given id : ${req.params.id}`);

  let response = await Product.findByIdAndRemove({ _id: req.params.id });
  if (response.err)
    return res
      .status(404)
      .json({ status: false, message: "Failed to retrive details" });
  else return res.status(200).json({ response: response });
};

module.exports.editbyQuantityIdProduct = async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  console.log("Edit Quantity Working")
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  let response = await Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        remainingQuantity: req.body.remainingQuantity,
      }
    }
  );
  try {
    if (response.err)
      return res
        .status(404)
        .json({ status: false, message: "Failed to retrive details" });
    else return res.status(200).json({ response });
  } catch (error) {}
};



module.exports.editbyIdProduct = async (req, res) => {
  console.log(req.body);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  let response = await Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        price: req.body.price,
        ssize: req.body.ssize,
        msize: req.body.msize,
        lsize: req.body.lsize,
        xlsize: req.body.xlsize,
        information1: req.body.information1,
        information2: req.body.information2
      }
    }
  );
  try {
    if (response.err)
      return res
        .status(404)
        .json({ status: false, message: "Failed to retrive details" });
    else return res.status(200).json({ response });
  } catch (error) {}
};


module.exports.editbyinformationIdProduct = async (req, res) => {
  console.log(req.body);
  console.log("Edit Info Working")
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  let response = await Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        brandName: req.body.brandName,
        itemNo: req.body.itemNo,
        supplierName: req.body.supplierName,
        weight: req.body.weight,
        weightq: req.body.weightq,
        quantity: req.body.quantity,
        remainingQuantity: req.body.remainingQuantity,
        description: req.body.description
      }
    }
  );
  try {
    if (response.err)
      return res
        .status(404)
        .json({ status: false, message: "Failed to retrive details" });
    else return res.status(200).json({ response });
  } catch (error) {}
};

module.exports.editbyStatusIdProduct = async (req, res) => {
  console.log(req.body.status);
  console.log(req.params.id)
  console.log("Edit Status Working")
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  if (req.body.status == "Active"){
  console.log("If working")
  let response = await Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "Deactive",
      }
    } 
  );
  try {
    if (response.err)
      return res
        .status(404)
        .json({ status: false, message: "Failed to retrive details" });
    else return res.status(200).json({ response });
  } catch (error) {}
}
else{
  console.log("Else working")
  let response = await Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "Active",
      }
    } 
  );
  try {
    if (response.err)
      return res
        .status(404)
        .json({ status: false, message: "Failed to retrive details" });
    else return res.status(200).json({ response });
  } catch (error) {}
}
};
