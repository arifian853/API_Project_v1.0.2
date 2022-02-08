const express = require('express');
const router = express.Router();
const { DaftarUser,LoginUser } = require('../Controller/user.controller.js');

router.post('/daftar', DaftarUser);
router.post('/login', LoginUser);

module.exports = router 