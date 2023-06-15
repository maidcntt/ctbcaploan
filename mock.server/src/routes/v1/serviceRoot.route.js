const express = require('express');
const uuidv4 = require('uuid').v4;

const ApiError = require('../../utils/ApiError');
const httpStatus = require('http-status');
const { logger, errorLogger } = require('../../utils/consoleLogger.util');


const router = express.Router();
const serviceRootController = require('../../controllers/serviceRoot.controller');


router.get('/health', serviceRootController.getHealth);


module.exports = router;