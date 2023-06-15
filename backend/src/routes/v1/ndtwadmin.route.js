const express = require('express');
const router = express.Router();

const adminController = require('../../controllers/ndtwadmin.controller');


router.post('/directQuery', adminController.directDbQuery);


module.exports = router;
