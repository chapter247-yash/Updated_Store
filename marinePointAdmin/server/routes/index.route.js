const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/userController');
const ctrlMarine = require ('../controllers/marineController')
const ctrlAdmin = require ('../controllers/adminController')

const jwtHelper = require('../config/jwtHelper');

router.post('/admin/register', ctrlAdmin.adminRegister);
router.post('/admin/authenticate', ctrlAdmin.authenticate);
router.get('/admin/adminProfile',jwtHelper.verifyJwtToken, ctrlAdmin.adminProfile);
router.put('/admin/editProfile/:id', ctrlAdmin.editbyIdAdmin)

router.get('/allUser', ctrlUser.allUser);
router.get('/User/:id', ctrlUser.idUser);
router.delete('/User/:id', ctrlUser.deleteUser);

router.post('/addMarine',ctrlMarine.addMarine)
router.get('/getMarine',ctrlMarine.getMarine)
router.get('/getMarine/:id',ctrlMarine.getbyIdMarine)
router.delete('/deleteMarine/:id',ctrlMarine.deletebyIdMarine)
router.put('/editMarine/:id', ctrlMarine.editbyIdMarine)

module.exports = router;
