const Joi = require('joi');

const getREGUH = {
  body: Joi.object().keys({
    LAUFD: Joi.date().required(),
    LAUFI: Joi.string().required(),
    ZBUKR: Joi.string().required(),
    payment_notification_method: Joi.string().equal('0', '1', '2', '3', 'A', 'B', 'C').required(),
    payment_remarks: Joi.string().min(0)
  })
};

const getSAPREGUH = {
  body: Joi.object().keys({
    tables: Joi.array().min(0)
  })
};

module.exports = {
  getREGUH,
  getSAPREGUH
};
