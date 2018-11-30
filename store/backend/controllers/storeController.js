const mongoose = require("mongoose");
var ObjectId = require("mongoose").Types.ObjectId;
var thumb = require("node-thumbnail").thumb;
var uuid = require("uuid");
var multer = require("multer");
const imageConfig = require("../image");
const Product = mongoose.model("Product");

module.exports.addProduct = async (req, res) => {
  console.log(req.body);
  var product = new Product();
  (product.name = req.body.name),
  (product.brandName = req.body.brandName),
  (product.itemNo = req.body.itemNo),
  (product.supplierName = req.body.supplierName),
  (product.weight = req.body.weight),
  (product.weightq = req.body.weightq),
  (product.quantity = req.body.quantity),
  (product.remainingQuantity = req.body.quantity),
  (product.new = req.body.new),
  (product.sale = req.body.sale),
  (product.percentage = req.body.percentage),
  (product.regular = req.body.regular),
  (product.groupOrder = req.body.groupOrder),
  (product.quickQuote = req.body.quickQuote);
  product.uniform = req.body.uniform;
  product.printted = req.body.printted;
  product.embroidery = req.body.embroidery;
  product.description = req.body.description;

  product.price = req.body.price;
  product.sizes = req.body.sizes;
  product.sizem = req.body.sizem;
  product.sizel = req.body.sizel;
  product.sizexl = req.body.sizexl;
  product.information1 = req.body.information1;
  product.information2 = req.body.information2;

  product.colorName = req.body.colorName;
  product.colorCode = req.body.colorCode;
  product.productImageFront = req.body.productImageFront;
  product.productImageBack = req.body.productImageBack;

  product.men = req.body.men;
  product.women = req.body.women;
  product.m_ts_shortSleeve = req.body.m_ts_shortSleeve;
  product.m_ts_longSleeve = req.body.m_ts_longSleeve;
  product.m_ts_performance = req.body.m_ts_performance;
  product.m_sh_shortSleeve = req.body.m_sh_shortSleeve;
  product.m_sh_longSleeve = req.body.m_sh_longSleeve;
  product.m_sh_performance = req.body.m_sh_performance;
  product.m_po_shortSleeve = req.body.m_po_shortSleeve;
  product.m_po_longSleeve = req.body.m_po_longSleeve;
  product.w_ts_shortSleeve = req.body.w_ts_shortSleeve;
  product.w_ts_longSleeve = req.body.w_ts_longSleeve;
  product.w_ts_performance = req.body.w_ts_performance;
  product.w_sh_shortSleeve = req.body.w_sh_shortSleeve;
  product.w_sh_longSleeve = req.body.w_sh_longSleeve;
  product.w_po_shortSleeve = req.body.w_po_shortSleeve;
  product.w_po_longSleeve = req.body.w_po_longSleeve;
  let response = await product.save();
  if (response.err)
    return res
      .status(404)
      .json({ status: false, message: "Failed to add Product" });
  else return res.status(200).json({ response: response });
};

module.exports.deleteMultipleProduct = async (req, res) =>{
  console.log(req.body)
  $data = req.body 
  console.log($data)
  console.log($data.length)
  console.log($data[0]);
  console.log($data[1])
  for ( i=0 ; i <= $data.length-1; ++i){
    console.log(i)
  console.log($data[i])
  var response = await Product.findByIdAndRemove({ _id: $data[i] });
  }
  if (response.err)
    return res
      .status(404)
      .json({ status: false, message: "Failed to retrive details" });
   return res.status(200).json({ response: response })
}

module.exports.deleteAllProduct = async (req, res) =>{
  var response = await Product.remove({});
  if (response.err)
    return res
      .status(404)
      .json({ status: false, message: "Failed to retrive details" });
   return res.status(200).json({ response: response })
}

module.exports.activeMultipleProduct = async (req, res) =>{
  console.log(req.body)
  $data = req.body 
  console.log($data)
  console.log($data.length)
  console.log($data[0]);
  console.log($data[1])
  for ( i=0 ; i <= $data.length-1; ++i){
    console.log(i)
  console.log($data[i])
    var response = await Product.findOneAndUpdate(
      { _id: $data[i]  },
      {
        $set: {
          status: "Active",
        }
      } 
    );
    }
      if (response.err)
        return res
          .status(404)
          .json({ status: false, message: "Failed to retrive details" });
      else return res.status(200).json({ response });
}

module.exports.deactiveMultipleProduct = async (req, res) =>{
  console.log(req.body)
  $data = req.body 
  console.log($data)
  console.log($data.length)
  console.log($data[0]);
  console.log($data[1])
  for ( i=0 ; i <= $data.length-1; ++i){
    console.log(i)
  console.log($data[i])
    var response = await Product.findOneAndUpdate(
      { _id: $data[i]  },
      {
        $set: {
          status: "Deactive",
        }
      } 
    );
    }
      if (response.err)
        return res
          .status(404)
          .json({ status: false, message: "Failed to retrive details" });
      else return res.status(200).json({ response });
}

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

module.exports.deleteColorByIdProduct = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  var i = req.body[0]
  console.log(i);
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).json(`No marine with given id : ${req.params.id}`);

  let response = await Product.update({ _id: req.params.id },{$unset: { '"colorCode."+ [i]' :""}});
  // Product.update({ _id: req.params.id },{$pull: {"colorName.0": null}})
    // {$unset: {colorName:i,colorCode:i,additionalPrice:i,frontImage: i,backImage: i,rightImage: i,leftImage: i,frontThumb: i,backThumb: i,rightThumb: i,leftThumb: i}});
    // {$pop: {colorName:i,colorCode:i,additionalPrice:i,frontImage: i,backImage: i,rightImage: i,leftImage: i,frontThumb: i,backThumb: i,rightThumb: i,leftThumb: i}});


  if (response.err)
    return res
      .status(404)
      .json({ status: false, message: "Failed to retrive details" });
  else return res.status(200).json({ response: response });
};


module.exports.editbycolorimageIdProduct = async (req, res) => {
  console.log(req.body);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);
    try {
      var $data = req.body; 
      console.log(req.files)
      if(req.body.frontImage === "" && req.body.backImage === "" && req.body.rightImage === "" && req.body.leftImage === ""){
        console.log("No Image")
    }
      else if(req.body.backImage === "" && req.body.rightImage === "" && req.body.leftImage === ""){
        console.log("Only Front Image")
          var frontImageName = req.files.frontImage[0].filename
          const frontimage = "public/files/" + frontImageName;
          const frontthumbName = "thumbnail_" + frontImageName;
          const frontthumbnailImg = "public/files/thumbnail/" + frontthumbName;
          imageConfig.resizeImage(frontimage, frontthumbnailImg, 200);
          $data.frontImage = frontimage;
          $data.frontThumb = frontthumbnailImg;
      }
      else if(req.body.rightImage === "" && req.body.leftImage === ""){
        console.log("Only Front & Back Image")
        var frontImageName = req.files.frontImage[0].filename
        var backImageName = req.files.backImage[0].filename
        const frontimage = "public/files/" + frontImageName;
        const frontthumbName = "thumbnail_" + frontImageName;
        const frontthumbnailImg = "public/files/thumbnail/" + frontthumbName;
        const backimage = "public/files/" + backImageName;
        const backthumbName = "thumbnail_" + backImageName;
        const backthumbnailImg = "public/files/thumbnail/" + backthumbName;
        imageConfig.resizeImage(frontimage, frontthumbnailImg, 200);
        imageConfig.resizeImage(backimage, backthumbnailImg, 200);
        $data.frontImage = frontimage;
        $data.frontThumb = frontthumbnailImg;
        $data.backImage = backimage;
        $data.backThumb = backthumbnailImg;
    }
    else if(req.body.leftImage === ""){
      console.log("Front, Back & Right Image")
      var frontImageName = req.files.frontImage[0].filename
      var backImageName = req.files.backImage[0].filename
      var rightImageName = req.files.rightImage[0].filename
      const frontimage = "public/files/" + frontImageName;
      const frontthumbName = "thumbnail_" + frontImageName;
      const frontthumbnailImg = "public/files/thumbnail/" + frontthumbName;
      const backimage = "public/files/" + backImageName;
      const backthumbName = "thumbnail_" + backImageName;
      const backthumbnailImg = "public/files/thumbnail/" + backthumbName;
      const rightimage = "public/files/" + rightImageName;
      const rightthumbName = "thumbnail_" + rightImageName;
      const rightthumbnailImg = "public/files/thumbnail/" + rightthumbName;
      imageConfig.resizeImage(frontimage, frontthumbnailImg, 200);
      imageConfig.resizeImage(backimage, backthumbnailImg, 200);
      imageConfig.resizeImage(rightimage, rightthumbnailImg, 200);
      $data.frontImage = frontimage;
      $data.frontThumb = frontthumbnailImg;
      $data.backImage = backimage;
      $data.backThumb = backthumbnailImg;
      $data.rightImage = rightimage;
      $data.rightThumb = rightthumbnailImg;
  }
      else
      { 
      console.log("else working")
      var frontImageName = req.files.frontImage[0].filename
      var backImageName = req.files.backImage[0].filename
      var rightImageName = req.files.rightImage[0].filename
      var leftImageName = req.files.leftImage[0].filename
        const frontimage = "public/files/" + frontImageName;
        const frontthumbName = "thumbnail_" + frontImageName;
        const frontthumbnailImg = "public/files/thumbnail/" + frontthumbName;
  
        const backimage = "public/files/" + backImageName;
        const backthumbName = "thumbnail_" + backImageName;
        const backthumbnailImg = "public/files/thumbnail/" + backthumbName;

        const rightimage = "public/files/" + rightImageName;
        const rightthumbName = "thumbnail_" + rightImageName;
        const rightthumbnailImg = "public/files/thumbnail/" + rightthumbName;

        const leftimage = "public/files/" + leftImageName;
        const leftthumbName = "thumbnail_" + leftImageName;
        const leftthumbnailImg = "public/files/thumbnail/" + leftthumbName;
  
        imageConfig.resizeImage(frontimage, frontthumbnailImg, 200);
        imageConfig.resizeImage(backimage, backthumbnailImg, 200);
        imageConfig.resizeImage(rightimage, rightthumbnailImg, 200);
        imageConfig.resizeImage(leftimage, leftthumbnailImg, 200);
        $data.frontImage = frontimage;
        $data.frontThumb = frontthumbnailImg;
        $data.backImage = backimage;
        $data.backThumb = backthumbnailImg;
        $data.rightImage = rightimage;
        $data.rightThumb = rightthumbnailImg;
        $data.leftImage = leftimage;
        $data.leftThumb = leftthumbnailImg;
      }
      console.log($data)
      if($data.frontImage === "" && $data.backImage === "" && $data.rightImage === "" && $data.leftImage === ""){
        var product = new Product($data);
        let response = await Product.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: {
              colorName: $data.newColorName,
              colorCode: $data.newColorCode,
              additionalPrice: $data.additionalPrice,
              frontImage: "empty",
              frontThumb: "empty",
              backImage:  "empty",
              backThumb: "empty",
              rightImage:  "empty",
              rightThumb: "empty",
              leftImage:  "empty",
              leftThumb: "empty"
            }
          }
        );
          return res.status(200).json({
            response: response,
            Message: "Product updated successfully"
          });
      }
      else if($data.backImage === "" && $data.rightImage === "" && $data.leftImage === ""){
        var product = new Product($data);
        let response = await Product.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: {
              colorName: $data.newColorName,
              colorCode: $data.newColorCode,
              additionalPrice: $data.additionalPrice,
              frontImage: $data.frontImage,
              frontThumb:$data.frontThumb,
              backImage:  "empty",
              backThumb: "empty",
              rightImage:  "empty",
              rightThumb: "empty",
              leftImage:  "empty",
              leftThumb: "empty"
            }
          }
        );
          return res.status(200).json({
            response: response,
            Message: "Product updated successfully"
          });
      }
      else if($data.rightImage === "" && $data.leftImage === ""){
        var product = new Product($data);
        let response = await Product.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: {
              colorName: $data.newColorName,
              colorCode: $data.newColorCode,
              additionalPrice: $data.additionalPrice,
              frontImage: $data.frontImage,
              frontThumb:$data.frontThumb,
              backImage: $data.backImage,
              backThumb:$data.backThumb,
              rightImage:  "empty",
              rightThumb: "empty",
              leftImage:  "empty",
              leftThumb: "empty"
            }
          }
        );
          return res.status(200).json({
            response: response,
            Message: "Product updated successfully"
          });
      }
      else if($data.leftImage === ""){
        var product = new Product($data);
        let response = await Product.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: {
              colorName: $data.newColorName,
              colorCode: $data.newColorCode,
              additionalPrice: $data.additionalPrice,
              frontImage: $data.frontImage,
              frontThumb:$data.frontThumb,
              backImage: $data.backImage,
              backThumb:$data.backThumb,
              rightImage: $data.rightImage,
              rightThumb:$data.rightThumb,
              leftImage:  "empty",
              leftThumb: "empty"
            }
          }
        );
          return res.status(200).json({
            response: response,
            Message: "Product updated successfully"
          });
      }
      else{
      console.log($data)
      var product = new Product($data);
      let response = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          colorName: $data.newColorName,
          colorCode: $data.newColorCode,
          additionalPrice: $data.additionalPrice,
          frontImage: $data.frontImage,
          frontThumb:$data.frontThumb,
          backImage: $data.backImage,
          backThumb:$data.backThumb,
          rightImage: $data.rightImage,
          rightThumb:$data.rightThumb,
          leftImage: $data.leftImage,
          leftThumb:$data.leftThumb
        }
      }
    );
      return res.status(200).json({
        response: response,
        Message: "Product updated successfully"
      });
  }
}
catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.Message ? error.Message : "Unexpected error occure."
    });
  }
};


module.exports.editbycategoryIdProduct = async (req, res) => {
  console.log(req.body);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  let response = await Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {

        men : req.body.men,
        m_ts_shortSleeve: req.body.m_ts_shortSleeve,
        m_ts_longSleeve: req.body.m_ts_longSleeve,
        m_ts_performance: req.body.m_ts_performance,
        m_sh_shortSleeve: req.body.m_sh_shortSleeve,
        m_sh_longSleeve: req.body.m_sh_longSleeve,
        m_sh_performance: req.body.m_sh_performance,

        women : req.body.women,
        m_po_shortSleeve: req.body.m_po_shortSleeve,
        m_po_longSleeve: req.body.m_po_longSleeve,
        w_ts_shortSleeve: req.body.w_ts_shortSleeve,
        w_ts_longSleeve: req.body.w_ts_longSleeve,
        w_ts_performance: req.body.w_ts_performance,
        w_sh_shortSleeve: req.body.w_sh_shortSleeve,
        w_sh_longSleeve: req.body.w_sh_longSleeve,
        w_po_shortSleeve: req.body.w_po_shortSleeve,
        w_po_longSleeve: req.body.w_po_longSleeve
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
        remainingQuantity: req.body.quantity,
        new : req.body.new,
        sale : req.body.sale,
        percentage : req.body.percentage,
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

// module.exports.addProduct = async (req, res) => {
//   console.log(req.body)
//   try {
//     var $data = req.body; 
//     console.log(req.file)
//     if (req.file.filename) {
//       var imageName =req.file.filename;
//       const image = "public/files/" + imageName;
//       const thumbName = "thumbnail_" + imageName;
//       const thumbnailImg = "public/files/thumbnail/" + thumbName;
//       console.log(image)
//       console.log(thumbName);
//       console.log(thumbnailImg)
//       imageConfig.resizeImage(image, thumbnailImg, 200);
//       $data.productImage = image;
//       $data.productThumb = thumbnailImg;
//     }
//     var product = new Product($data);
//     const response = await product.save();
//     return res.status(200).json({
//       response: response,
//       Message: "Product updated successfully"
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       error: error.Message ? error.Message : "Unexpected error occure."
//     });
//   }
// };

// module.exports.addProductImage = async (req, res) => {
//   console.log(req.body);
//   try {
//     var $data = req.body;
//     console.log($data);
//     console.log(req.file.filename)
//     if (req.file.filename) {
//       var imageName = req.file.filename;
//       const name = req.body.name;
//       const image = "public/files/" + imageName;
//       const thumbName = "thumbnail_" + imageName;
//       const thumbnailImg = "public/files/thumbnail/" + thumbName;
//       imageConfig.resizeImage(image, thumbnailImg, 200);
//       $data.productImage = image;
//       $data.productThumb = thumbnailImg;
//     }
//     var Image = new ProductImage($data);
//     const result = await Image.save();
//     return res.status(200).json({
//       ResponseCode: 200,
//       Data: result,
//       Message: "Image/File updated successfully"
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       error: error.Message ? error.Message : "Unexpected error occure."
//     });
//   }
// };

// module.exports.addProduct = async (req, res) => {
//   console.log(req.body)
//   try {
//     var $data = req.body; 
//     console.log(req.file)
//     if (req.file.filename) {
//       var imageName =req.file.filename;
//       const image = "public/files/" + imageName;
//       const thumbName = "thumbnail_" + imageName;
//       const thumbnailImg = "public/files/thumbnail/" + thumbName;
//       console.log(image)
//       console.log(thumbName);
//       console.log(thumbnailImg)
//       imageConfig.resizeImage(image, thumbnailImg, 200);
//       $data.productImage = image;
//       $data.productThumb = thumbnailImg;
//     }
//     var product = new Product($data);
//     const response = await product.save();
//     return res.status(200).json({
//       response: response,
//       Message: "Product updated successfully"
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       error: error.Message ? error.Message : "Unexpected error occure."
//     });
//   }
// };

// module.exports.editbycolorimageIdProduct = async (req, res) => {
//   console.log(req.body);
//   if (!ObjectId.isValid(req.params.id))
//     return res.status(400).send(`No record with given id : ${req.params.id}`);

//   let response = await Product.findOneAndUpdate(
//     { _id: req.params.id },
//     {
//       $set: {
//         colorName: req.body.colorName,
//         colorCode: req.body.colorCode,
//         frontImage: req.body.frontImage,
//         backImage: req.body.backImage
//       }
//     }
//   );
//   try {
//     if (response.err)
//       return res
//         .status(404)
//         .json({ status: false, message: "Failed to retrive details" });
//     else return res.status(200).json({ response });
//   } catch (error) {}
// };

// module.exports.editbycolorimageIdProduct = async (req, res) => {
//   console.log(req.body);
//   if (!ObjectId.isValid(req.params.id))
//     return res.status(400).send(`No record with given id : ${req.params.id}`);
//   try {
//     var $data = req.body; 
//     console.log(req.file)
//     if (req.file.filename)
//     {
//       var imageName =req.file.filename;
//       const image = "public/files/" + imageName;
//       const thumbName = "thumbnail_" + imageName;
//       const thumbnailImg = "public/files/thumbnail/" + thumbName;
//       console.log(image)
//       console.log(thumbName);
//       console.log(thumbnailImg)
//       imageConfig.resizeImage(image, thumbnailImg, 200);
//       $data.frontImage = image;
//       $data.frontThumb = thumbnailImg;
//     }
//     var product = new Product($data);
//     let response = await Product.findOneAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: {
//           colorName: $data.colorName,
//           colorCode: $data.colorCode,
//           frontImage: $data.frontImage,
//           frontThumb:$data.frontThumb
//         }
//       }
//     );
//     return res.status(200).json({
//       response: response,
//       Message: "Product updated successfully"
//     });
// }
// catch (error) {
//     console.log(error);
//     res.status(500).json({
//       error: error.Message ? error.Message : "Unexpected error occure."
//     });
//   }
// };

// module.exports.addbycolorimage = async (req, res) => {
//   console.log(req.body);
//   try {
//     var $data = req.body; 
//     console.log(req.files)
//     if (req.files)
//     {
//     console.log("if working")
//     var frontImageName = req.files.frontImage[0].filename
//     console.log(frontImageName)
//     var backImageName = req.files.backImage[0].filename
//     console.log(backImageName)
//       const frontimage = "public/files/" + frontImageName;
//       const frontthumbName = "thumbnail_" + frontImageName;
//       const frontthumbnailImg = "public/files/thumbnail/" + frontthumbName;

//       const backimage = "public/files/" + backImageName;
//       const backthumbName = "thumbnail_" + backImageName;
//       const backthumbnailImg = "public/files/thumbnail/" + backthumbName;

//       imageConfig.resizeImage(frontimage, frontthumbnailImg, 200);
//       imageConfig.resizeImage(backimage, backthumbnailImg, 200);
//       $data.frontImage = frontimage;
//       $data.frontThumb = frontthumbnailImg;
//       $data.backImage = backimage;
//       $data.backThumb = backthumbnailImg;
//     }
//     console.log($data)
//     var products = new ProductImage($data);
//     let response = await products.save();
//     return res.status(200).json({
//       response: response,
//       Message: "Product updated successfully"
//     });
// }
// catch (error) {
//     console.log(error);
//     res.status(500).json({
//       error: error.Message ? error.Message : "Unexpected error occure."
//     });
//   }
// };



// module.exports.editbyQuantityIdProduct = async (req, res) => {
//   console.log(req.body);
//   console.log("Edit Quantity Working")
//   if (!ObjectId.isValid(req.params.id))
//     return res.status(400).send(`No record with given id : ${req.params.id}`);

//   let response = await Product.findOneAndUpdate(
//     { _id: req.params.id },
//     {
//       $set: {
//         remainingQuantity: req.body.remainingQuantity,
//       }
//     }
//   );
//   try {
//     if (response.err)
//       return res
//         .status(404)
//         .json({ status: false, message: "Failed to retrive details" });
//     else return res.status(200).json({ response });
//   } catch (error) {}
// };


// module.exports.editbycolorimageIdProduct = async (req, res) => {
//   console.log(req.body);
//   if (!ObjectId.isValid(req.params.id))
//     return res.status(400).send(`No record with given id : ${req.params.id}`);
//     try {
//       var $data = req.body; 
//       console.log(req.files)
//       if(req.body.frontImage === "" && req.body.backImage === "" && req.body.rightImage === "" && req.body.leftImage === ""){
//         console.log("No Image")
//     }
//       else if(req.body.backImage === "" && req.body.rightImage === "" && req.body.leftImage === ""){
//         console.log("Only Front Image")
//           var frontImageName = req.files.frontImage[0].filename
//           const frontimage = "public/files/" + frontImageName;
//           const frontthumbName = "thumbnail_" + frontImageName;
//           const frontthumbnailImg = "public/files/thumbnail/" + frontthumbName;
//           imageConfig.resizeImage(frontimage, frontthumbnailImg, 200);
//           $data.frontImage = frontimage;
//           $data.frontThumb = frontthumbnailImg;
//       }
//       else if(req.body.rightImage === "" && req.body.leftImage === ""){
//         console.log("Only Front & Back Image")
//         var frontImageName = req.files.frontImage[0].filename
//         var backImageName = req.files.backImage[0].filename
//         const frontimage = "public/files/" + frontImageName;
//         const frontthumbName = "thumbnail_" + frontImageName;
//         const frontthumbnailImg = "public/files/thumbnail/" + frontthumbName;
//         const backimage = "public/files/" + backImageName;
//         const backthumbName = "thumbnail_" + backImageName;
//         const backthumbnailImg = "public/files/thumbnail/" + backthumbName;
//         imageConfig.resizeImage(frontimage, frontthumbnailImg, 200);
//         imageConfig.resizeImage(backimage, backthumbnailImg, 200);
//         $data.frontImage = frontimage;
//         $data.frontThumb = frontthumbnailImg;
//         $data.backImage = backimage;
//         $data.backThumb = backthumbnailImg;
//     }
//     else if(req.body.leftImage === ""){
//       console.log("Front, Back & Right Image")
//       var frontImageName = req.files.frontImage[0].filename
//       var backImageName = req.files.backImage[0].filename
//       var rightImageName = req.files.rightImage[0].filename
//       const frontimage = "public/files/" + frontImageName;
//       const frontthumbName = "thumbnail_" + frontImageName;
//       const frontthumbnailImg = "public/files/thumbnail/" + frontthumbName;
//       const backimage = "public/files/" + backImageName;
//       const backthumbName = "thumbnail_" + backImageName;
//       const backthumbnailImg = "public/files/thumbnail/" + backthumbName;
//       const rightimage = "public/files/" + rightImageName;
//       const rightthumbName = "thumbnail_" + rightImageName;
//       const rightthumbnailImg = "public/files/thumbnail/" + rightthumbName;
//       imageConfig.resizeImage(frontimage, frontthumbnailImg, 200);
//       imageConfig.resizeImage(backimage, backthumbnailImg, 200);
//       imageConfig.resizeImage(rightimage, rightthumbnailImg, 200);
//       $data.frontImage = frontimage;
//       $data.frontThumb = frontthumbnailImg;
//       $data.backImage = backimage;
//       $data.backThumb = backthumbnailImg;
//       $data.rightImage = rightimage;
//       $data.rightThumb = rightthumbnailImg;
//   }
//       else
//       { 
//       console.log("else working")
//       var frontImageName = req.files.frontImage[0].filename
//       var backImageName = req.files.backImage[0].filename
//       var rightImageName = req.files.rightImage[0].filename
//       var leftImageName = req.files.leftImage[0].filename
//         const frontimage = "public/files/" + frontImageName;
//         const frontthumbName = "thumbnail_" + frontImageName;
//         const frontthumbnailImg = "public/files/thumbnail/" + frontthumbName;
  
//         const backimage = "public/files/" + backImageName;
//         const backthumbName = "thumbnail_" + backImageName;
//         const backthumbnailImg = "public/files/thumbnail/" + backthumbName;

//         const rightimage = "public/files/" + rightImageName;
//         const rightthumbName = "thumbnail_" + rightImageName;
//         const rightthumbnailImg = "public/files/thumbnail/" + rightthumbName;

//         const leftimage = "public/files/" + leftImageName;
//         const leftthumbName = "thumbnail_" + leftImageName;
//         const leftthumbnailImg = "public/files/thumbnail/" + leftthumbName;
  
//         imageConfig.resizeImage(frontimage, frontthumbnailImg, 200);
//         imageConfig.resizeImage(backimage, backthumbnailImg, 200);
//         imageConfig.resizeImage(rightimage, rightthumbnailImg, 200);
//         imageConfig.resizeImage(leftimage, leftthumbnailImg, 200);
//         $data.frontImage = frontimage;
//         $data.frontThumb = frontthumbnailImg;
//         $data.backImage = backimage;
//         $data.backThumb = backthumbnailImg;
//         $data.rightImage = rightimage;
//         $data.rightThumb = rightthumbnailImg;
//         $data.leftImage = leftimage;
//         $data.leftThumb = leftthumbnailImg;
//       }
//       console.log($data)
//       if($data.frontImage === "" && $data.backImage === "" && $data.rightImage === "" && $data.leftImage === ""){
//         var product = new Product($data);
//         let response = await Product.findOneAndUpdate(
//           { _id: req.params.id },
//           {
//             $set: {
//               colorName: $data.colorName,
//               colorCode: $data.colorCode,
//             }
//           }
//         );
//           return res.status(200).json({
//             response: response,
//             Message: "Product updated successfully"
//           });
//       }
//       else if($data.backImage === "" && $data.rightImage === "" && $data.leftImage === ""){
//         var product = new Product($data);
//         let response = await Product.findOneAndUpdate(
//           { _id: req.params.id },
//           {
//             $set: {
//               colorName: $data.colorName,
//               colorCode: $data.colorCode,
//               frontImage: $data.frontImage,
//               frontThumb:$data.frontThumb,
//             }
//           }
//         );
//           return res.status(200).json({
//             response: response,
//             Message: "Product updated successfully"
//           });
//       }
//       else if($data.rightImage === "" && $data.leftImage === ""){
//         var product = new Product($data);
//         let response = await Product.findOneAndUpdate(
//           { _id: req.params.id },
//           {
//             $set: {
//               colorName: $data.colorName,
//               colorCode: $data.colorCode,
//               frontImage: $data.frontImage,
//               frontThumb:$data.frontThumb,
//               backImage: $data.backImage,
//               backThumb:$data.backThumb,
//             }
//           }
//         );
//           return res.status(200).json({
//             response: response,
//             Message: "Product updated successfully"
//           });
//       }
//       else if($data.leftImage === ""){
//         var product = new Product($data);
//         let response = await Product.findOneAndUpdate(
//           { _id: req.params.id },
//           {
//             $set: {
//               colorName: $data.colorName,
//               colorCode: $data.colorCode,
//               frontImage: $data.frontImage,
//               frontThumb:$data.frontThumb,
//               backImage: $data.backImage,
//               backThumb:$data.backThumb,
//               rightImage: $data.rightImage,
//               rightThumb:$data.rightThumb,
//             }
//           }
//         );
//           return res.status(200).json({
//             response: response,
//             Message: "Product updated successfully"
//           });
//       }
//       else{
//       console.log($data)
//       var product = new Product($data);
//       let response = await Product.findOneAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: {
//           colorName: $data.colorName,
//           colorCode: $data.colorCode,
//           frontImage: $data.frontImage,
//           frontThumb:$data.frontThumb,
//           backImage: $data.backImage,
//           backThumb:$data.backThumb,
//           rightImage: $data.rightImage,
//           rightThumb:$data.rightThumb,
//           leftImage: $data.leftImage,
//           leftThumb:$data.leftThumb
//         }
//       }
//     );
//       return res.status(200).json({
//         response: response,
//         Message: "Product updated successfully"
//       });
//   }
// }
// catch (error) {
//     console.log(error);
//     res.status(500).json({
//       error: error.Message ? error.Message : "Unexpected error occure."
//     });
//   }
// };
