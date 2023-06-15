const moment = require('moment');
const config = require('./config');

const refreshTokenConfig = {
  maxAge: moment().add(config.jwt.refreshExpirationDays, 'days').unix(),
  secure: true,
  sameSite: 'none'
};

if (config.env === 'production') {
  refreshTokenConfig.httpOnly = true;
  refreshTokenConfig.sameSite = 'strict';
}

module.exports = {
  refreshTokenConfig
};
