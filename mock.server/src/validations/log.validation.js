const Joi = require('joi');

const getLogs = {
  query: Joi.object().keys({
    name: Joi.string(),
    sort_by: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

module.exports = {
  getLogs
};
