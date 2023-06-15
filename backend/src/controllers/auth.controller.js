const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const authService = require('../services/auth.service');
const userService = require('../services/user.service');
const tokenService = require('../services/token.service');
const emailService = require('../services/email.service');
const { refreshTokenConfig } = require('../config/cookie');

const register = catchAsync(async (req, res) => {
  const createdUser = await userService.createUser(req.body);
  const user = await userService.getUserById(createdUser.id);
  res.status(httpStatus.CREATED).send(user);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const validUser = await authService.loginUserWithEmailAndPassword(email, password);
  const user = await userService.getUserById(validUser.id);
  const tokens = await tokenService.generateAuthTokens(user);
  const { access, refresh } = tokens;
  res.cookie('refresh_token', refresh.token, refreshTokenConfig);
  res.send({ user, access_token: access.token });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.cookies.refresh_token);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.cookies.refresh_token);
  const { access, refresh } = tokens;
  await res.cookie('refresh_token', refresh.token, refreshTokenConfig);
  res.send({ access_token: access.token });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail
};
