const express = require('express');
const router = express.Router();
const image = require ('../image')

const ctrlAdmin = require ('../controllers/adminController')
const ctrlProduct = require ('../controllers/storeController');
const jwtHelper = require('../config/jwtHelper');

var multer = require("multer");
var storage = multer({ storage: image.storage });


//PRODUCT:
//router.patch('/updateFile', UserController.updateFile) 
router.post('/addProduct',ctrlProduct.addProduct)
router.post('/deleteMultipleProduct',ctrlProduct.deleteMultipleProduct)
router.post('/activeMultipleProduct',ctrlProduct.activeMultipleProduct)
router.post('/deactiveMultipleProduct',ctrlProduct.deactiveMultipleProduct)

router.post('/deleteAllProduct',ctrlProduct.deleteAllProduct)
// router.post('/activeAllProduct',ctrlProduct.activeAllProduct)
// router.post('/deactiveAllProduct',ctrlProduct.deactiveAllProduct)
// router.post('/addProductImage',storage.single('productImage'),ctrlProduct.addProductImage)

router.get('/getProduct',ctrlProduct.getProduct)
router.get('/getProduct/:id',ctrlProduct.getbyIdProduct)
router.get('/getProduct/itemno/:itemNo',ctrlProduct.getbyitemNoProduct)

router.get('/getProductNew',ctrlProduct.getProductNew)
router.get('/getProductOld',ctrlProduct.getProductOld)
router.get('/getProductA-Z',ctrlProduct.getProductA)
router.get('/getProductZ-A',ctrlProduct.getProductZ)

// router.put('/editProduct/quantity/:id',ctrlProduct.editbyQuantityIdProduct)
router.put('/editProduct/:id',ctrlProduct.editbyIdProduct)
router.put('/editProduct/information/:id',ctrlProduct.editbyinformationIdProduct)
// router.put('/editProduct/colorimage/:id',storage.single('frontImage'),ctrlProduct.editbycolorimageIdProduct)
router.put('/editProduct/colorimage/:id',storage.fields([{name: 'frontImage', maxCount: 1}, {name: 'backImage', maxCount: 1},
                                                    {name: 'rightImage', maxCount: 1},, {name: 'leftImage', maxCount: 1}])
,ctrlProduct.editbycolorimageIdProduct)
router.put('/editProduct/category/:id',ctrlProduct.editbycategoryIdProduct)
router.put('/editProduct/status/:id',ctrlProduct.editbyStatusIdProduct)

router.delete('/deleteProduct/:id',ctrlProduct.deletebyIdProduct)

router.post('/deleteProductByColor/:id',ctrlProduct.deleteColorByIdProduct)

//ADMIN
router.post('/admin/register', ctrlAdmin.adminRegister);
router.post('/admin/authenticate', ctrlAdmin.authenticate);
module.exports = router;