const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const lineNotifyService = require('../services/lineNotify.service');
const ApiError = require('../utils/ApiError');

const authorize = catchAsync(async (req, res) => {
  const url = await lineNotifyService.generateAuthorizeURL(req);
  res.send(url);
});

const token = catchAsync(async (req, res) => {
  if (req.body.state !== lineNotifyService.lineNotifyState) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid state');
  }
  const result = await lineNotifyService.getAccessToken(req);
  if (result.status !== httpStatus.OK) {
    throw new ApiError(result.state, result.message);
  }

  const info = await lineNotifyService.checkTokenStatus(result.access_token);
  if (info.status === httpStatus.OK) {
    await lineNotifyService.createLineNotify({
      name: info.target,
      access_token: result.access_token,
      target_type: info.targetType,
      user_id: req.query.user_id
    });
  }
  res.cookie('access_token', result.access_token);
  res.redirect(req.query.redirect_uri);
});

const test = catchAsync(async (req, res) => {
  res.send(`綁定成功，access_token: ${req.cookies.access_token}`);
});

const notify = catchAsync(async (req, res) => {
  await lineNotifyService.sendNotify(req.body.access_token, req.body.message);
  res.send('發送成功');
});

module.exports = {
  authorize,
  token,
  notify,
  test
};
