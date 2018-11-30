var options = {
    validation: {
      'allowedExts': ['gif', 'jpeg', 'jpg', 'png', 'svg', 'blob'],
      'allowedMimeTypes': ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/x-png', 'image/png', 'image/svg+xml']
    }
 }
    
 var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "img/");
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() + "_" + path.extname(file.originalname).toLowerCase());
    }
 });
 var upload = multer({
    storage: Storage,
    fileFilter: function(req, file, cb) {
            var ext = path.extname(file.originalname)
            console.log('ext');
            console.log(ext);
            if (ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return cb(res.end('Only images are allowed'), null)
            }
        }
 });