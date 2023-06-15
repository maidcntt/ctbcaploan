const Joi = require('joi');
const { password } = require('./custom.validation');
const { roles } = require('../config/roles');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string()
      .required()
      .valid(...roles)
  })
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    email: Joi.string(),
    superior_name: Joi.string(),
    superior_email: Joi.string(),
    sort_by: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getUser = {
  params: Joi.object().keys({
    user_id: Joi.number().integer()
  })
};

const updateUser = {
  params: Joi.object().keys({
    user_id: Joi.number().integer().required()
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      role: Joi.string().valid(...roles)
    })
    .min(1)
};

const deleteUser = {
  params: Joi.object().keys({
    user_id: Joi.number().integer()
  })
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
