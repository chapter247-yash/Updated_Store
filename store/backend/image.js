var Jimp = require("jimp");
var multer = require("multer");

const resizeImage = (sourcePath, destinationPath, width) => {
  Jimp.read(sourcePath, function(err, lenna) {
    console.log(err)
    if (err) throw err;
    lenna
      .resize(width, Jimp.AUTO) // resize
      .quality(100) // set JPEG quality
      .write(destinationPath); // save
  });
  return true;
};

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/files");
  },
  filename: function(req, file, cb) {
    const filename = file.originalname.split('.');
    const ext = filename[filename.length - 1];
    cb(null, file.fieldname + "-" + Date.now() +"."+ext);
  }
});

const imageDimentions = [500, 100];

module.exports = {
  resizeImage,
  storage,
  imageDimentions
};
