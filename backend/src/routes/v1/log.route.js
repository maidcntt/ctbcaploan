const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const logValidation = require('../../validations/log.validation');
const logController = require('../../controllers/log.controller');

const router = express.Router();

router.route('/').get(auth('getLogs'), validate(logValidation.getLogs), logController.getLogs);

module.exports = router;
