const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/userController');
const ctrlMessage = require ('../controllers/messageController')
const ctrlMarine = require ('../controllers/marineController')
const ctrlAdmin = require ('../controllers/adminController')

const jwtHelper = require('../config/jwtHelper');

// const { Marine } = require ('../controllers/marineController')
// const ctrlMarine = new Marine();

router.post('/register', ctrlUser.register);
router.post('/verify/:email', ctrlUser.verifyUser);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/allUser', ctrlUser.allUser);
router.get('/User/:id', ctrlUser.idUser);
router.delete('/User/:id', ctrlUser.deleteUser);

router.post('/addMarine',ctrlMarine.addMarine)
router.get('/getMarine',ctrlMarine.getMarine)
router.get('/getMarine/:id',ctrlMarine.getbyIdMarine)
router.delete('/deleteMarine/:id',ctrlMarine.deletebyIdMarine)
router.put('/editMarine/:id', ctrlMarine.editbyIdMarine)

router.post('/contactForm',ctrlMessage.addMessage)

// router.post('/admin/authenticate', ctrlAdmin.adminAuthenticate);
// router.get('/admin/adminProfile',adminjwtHelper.verifyJwtToken,ctrlAdmin.adminProfile);
// router.put('/admin/editProfile/:id', ctrlAdmin.editbyIdAdmin)
router.post('/admin/register', ctrlAdmin.adminRegister);
router.post('/admin/authenticate', ctrlAdmin.authenticate);

module.exports = router;
