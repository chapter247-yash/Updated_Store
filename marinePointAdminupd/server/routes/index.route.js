const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/userController');
const ctrlMarine = require ('../controllers/marineController')
const ctrlAdmin = require ('../controllers/adminController')

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/verify/:email', ctrlUser.verifyUser);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/allUser', ctrlUser.allUser);
router.get('/User/:id', ctrlUser.idUser);
router.delete('/User/:id', ctrlUser.deleteUser);

router.post('/admin/addMarine',ctrlMarine.addMarine)
router.get('/admin/getMarine',ctrlMarine.getMarine)
router.get('/admin/getMarine/:id',ctrlMarine.getbyIdMarine)
router.delete('/admin/deleteMarine/:id',ctrlMarine.deletebyIdMarine)
router.put('/admin/editMarine/:id', ctrlMarine.editbyIdMarine)

// router.get('/admin/profile/:id',ctrlAdmin.profile);
// router.put('/admin/editprofile/:id', ctrlAdmin.editbyIdAdmin)
router.post('/admin/register', ctrlAdmin.adminRegister);
router.post('/admin/authenticate', ctrlAdmin.authenticate);

module.exports = router;
