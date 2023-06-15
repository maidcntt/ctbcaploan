const Joi = require('joi');

const toMXCP = {
  body: Joi.object().keys({
    I_TRANSACTIONID: Joi.string().required(),
    I_TABLENAME: Joi.string()
      .equal('REGUH', 'BKPF', 'J_1BBRANCH', 'T001', 'DFKKBPTAXNUM', 'BUT020', 'ADRC', 'ADR6')
      .required(),
    I_VALUE: Joi.array().min(1).required()
  })
};

module.exports = {
  toMXCP
};
