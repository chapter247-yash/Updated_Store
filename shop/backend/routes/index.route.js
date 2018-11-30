const express = require('express');
const router = express.Router();

const ctrlProduct = require ('../controllers/storeController')

router.post('/addProduct',ctrlProduct.addProduct)
// router.get('/getProduct',ctrlProduct.getMarine)
// router.get('/getProduct/:id',ctrlProduct.getbyIdMarine)
// router.delete('/deleteProduct/:id',ctrlProduct.deletebyIdMarine)
// router.put('/editProduct/:id',ctrlProduct.editbyIdMarine)

module.exports = router;
