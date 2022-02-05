const express = require('express');
const router = express.Router();
const { DaftarUser } = require('../Controller/user.controller.js');

router.post('/daftar', DaftarUser);

module.exports = router 