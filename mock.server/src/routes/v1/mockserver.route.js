const express = require('express');
const router = express.Router();


const mockServerController = require('../../controllers/mockserver.controller');

router.get('/activate', mockServerController.activate);

router.get('/auth', mockServerController.auth);

router.post('/createAp', mockServerController.createAp);

router.post('/createCases', mockServerController.createCases);

router.post('/signDataByKms', mockServerController.signDataByKms);

router.post('/readApByNumber', mockServerController.readApByNumber);

router.post('/readCaseByCaseStatus', mockServerController.readCaseByCaseStatus);

router.post('/readCaseByNumber', mockServerController.readCaseByNumber);

router.post('/readCaseByApplicationTime', mockServerController.readCaseByApplicationTime);


module.exports = router;
