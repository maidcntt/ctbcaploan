const httpStatus = require('http-status');
const axios = require('axios');
const { LineNotify } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

const lineNotifyState = (Math.random() + 1).toString(36).substring(5);

const generateAuthorizeURL = async (req) => {
  const redirectURI = new URL(config.lineNotify.redirect_uri);
  const redirectURISearchParams = {
    redirect_uri: req.query.redirect_uri,
    user_id: req.user.id
  };
  redirectURI.search = new URLSearchParams(redirectURISearchParams).toString();

  const url = new URL('https://notify-bot.line.me/oauth/authorize');
  const searchParams = {
    response_type: 'code',
    client_id: config.lineNotify.client_id,
    redirect_uri: redirectURI,
    scope: 'notify',
    state: lineNotifyState,
    response_mode: 'form_post'
  };
  url.search = new URLSearchParams(searchParams).toString();
  return { url };
};

const getAccessToken = async (req) => {
  const redirectURI = new URL(config.lineNotify.redirect_uri);
  const redirectURISearchParams = {
    redirect_uri: req.query.redirect_uri,
    user_id: req.query.user_id
  };
  redirectURI.search = new URLSearchParams(redirectURISearchParams).toString();

  const response = await axios
    .post(
      'https://notify-bot.line.me/oauth/token',
      {
        grant_type: 'authorization_code',
        code: req.body.code,
        redirect_uri: redirectURI,
        client_id: config.lineNotify.client_id,
        client_secret: config.lineNotify.client_secret
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    .catch((err) => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    });
  return response.data;
};

const checkTokenStatus = async (accessToken) => {
  const response = await axios
    .get('https://notify-api.line.me/api/status', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .catch((err) => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    });
  return response.data;
};

/**
 * Create LineNotify
 * @param {Object} lineNotifyObj
 * @returns {Promise<LineNotify>}
 */
const createLineNotify = async (lineNotifyObj) => {
  const lineNotify = await LineNotify.create(lineNotifyObj);
  return lineNotify;
};

const sendNotify = async (accessToken, message) => {
  const response = await axios
    .post(
      'https://notify-api.line.me/api/notify',
      {
        message
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    .catch((err) => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    });
  return response.data;
};

module.exports = {
  lineNotifyState,
  generateAuthorizeURL,
  getAccessToken,
  checkTokenStatus,
  createLineNotify,
  sendNotify
};
