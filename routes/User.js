const express = require('express');
const router = express.Router();
const { RegisterUser, RegisterAdmin, LoginUser, LoginAdmin } = require('../controller/user.controller.js');
const { validationRegister, validationLogin, validationAdminReg, validationAdminLogin, runValidation } = require('../validation/index.js');

router.post('/register', validationRegister, runValidation, RegisterUser);
router.post('/registerAdmin',validationAdminReg, runValidation, RegisterAdmin);
router.post('/login', validationLogin, runValidation, LoginUser);
router.post('/loginAdmin',validationAdminLogin, runValidation, LoginAdmin);


module.exports = router 