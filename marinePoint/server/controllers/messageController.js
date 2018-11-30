const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");

const Message = mongoose.model("Message");

module.exports.addMessage = async (req, res) => {
  console.log(req.body);
  var message = new Message();
    (message.name = req.body.name),
    (message.email = req.body.email),
    (message.subject = req.body.subject),
    (message.message = req.body.message);
  let response = await message.save();
  if (response.err)
    return res
      .status(404)
      .json({ status: false, message: "Failed to add Message" });
  else return res.status(200).json({ response: response });
};
