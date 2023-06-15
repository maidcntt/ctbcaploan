const Joi = require('joi');

const authorize = {
  query: Joi.object().keys({
    redirect_uri: Joi.string().required()
  })
};

const token = {
  query: Joi.object().keys({
    redirect_uri: Joi.string(),
    user_id: Joi.number()
  }),
  body: Joi.object().keys({
    code: Joi.string(),
    state: Joi.string()
  })
};

const notify = {
  body: Joi.object().keys({
    access_token: Joi.string().required(),
    message: Joi.string().required()
  })
};

module.exports = {
  authorize,
  token,
  notify
};
