const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const lineNotifyValidation = require('../../validations/lineNotify.validation');
const lineNotifyController = require('../../controllers/lineNotify.controller');

const router = express.Router();

router
  .route('/authorize')
  .get(auth('getLineNotifyURL'), validate(lineNotifyValidation.authorize), lineNotifyController.authorize);
router.route('/token').post(validate(lineNotifyValidation.token), lineNotifyController.token);
router.route('/notify').post(auth('sendLineNotify'), validate(lineNotifyValidation.notify), lineNotifyController.notify);
router.route('/test').get(lineNotifyController.test);

module.exports = router;
