const express = require('express');
const router = express.Router();


const ctbcMenesController = require('../../controllers/ctbcmenes.controller');


router.post('/createAp', ctbcMenesController.createAp);

router.post('/createCases', ctbcMenesController.createCases);

router.post('/signDataByKms', ctbcMenesController.signDataByKms);

router.post('/readApByNumber', ctbcMenesController.readApByNumber);

router.post('/readCaseByCaseStatus', ctbcMenesController.readCaseByCaseStatus);

router.post('/readCaseByNumber', ctbcMenesController.readCaseByNumber);

router.post('/readCaseByApplicationTime', ctbcMenesController.readCaseByApplicationTime);


module.exports = router;
