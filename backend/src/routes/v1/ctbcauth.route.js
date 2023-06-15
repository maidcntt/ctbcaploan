const express = require('express');
const router = express.Router();


const ctbcAuthController = require('../../controllers/ctbcauth.controller');


router.get('/activate', ctbcAuthController.activate);

router.get('/auth', ctbcAuthController.auth);


module.exports = router;
