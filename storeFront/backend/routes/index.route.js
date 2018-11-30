const express = require('express');
const router = express.Router();

const ctrlUser = require ('../controllers/userController')
const ctrlProduct = require ('../controllers/storeController');
const ctrlMessage = require ('../controllers/messageController')

var multer = require("multer");

//PRODUCT:
router.post('/activeMultipleProduct',ctrlProduct.activeMultipleProduct)
router.post('/deactiveMultipleProduct',ctrlProduct.deactiveMultipleProduct)

router.post('/deleteAllProduct',ctrlProduct.deleteAllProduct)

router.get('/getProduct',ctrlProduct.getProduct)
router.get('/getProduct/:id',ctrlProduct.getbyIdProduct)
router.get('/getProduct/itemno/:itemNo',ctrlProduct.getbyitemNoProduct)

router.get('/getProductNew',ctrlProduct.getProductNew)
router.get('/getProductOld',ctrlProduct.getProductOld)
router.get('/getProductA-Z',ctrlProduct.getProductA)
router.get('/getProductZ-A',ctrlProduct.getProductZ)

router.get('/getProductMen',ctrlProduct.getProductMen)
router.get('/getProductWomen',ctrlProduct.getProductWomen)

router.put('/editProduct/information/:id',ctrlProduct.editbyinformationIdProduct)
// router.put('/editProduct/quantity/:id',ctrlProduct.editbyQuantityIdProduct)


//USER
router.post('/user/register',ctrlUser.userRegister);
router.post('/user/authenticate', ctrlUser.userAuthenticate);
router.get('/user/profile', ctrlUser.userProfile);
router.get('/user/allUser',ctrlUser.allUser);

//CONTACT
router.post('/contactForm',ctrlMessage.addMessage)


module.exports = router;