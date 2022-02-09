const express = require('express');
const router = express.Router();
const { RegisterUser, RegisterAdmin, LoginUser, LoginAdmin } = require('../controller/user.controller.js');

router.post('/register', RegisterUser);
router.post('/registerAdmin', RegisterAdmin);
router.post('/login', LoginUser);
router.post('/loginAdmin', LoginAdmin);


module.exports = router 