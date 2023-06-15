const Joi = require('joi');

const getCAUFVD = {
  body: Joi.array().items(
    Joi.object({
      DMODEO: Joi.string().valid('', 'X').required(),
      DMODEN: Joi.alternatives().conditional('DMODEO', {
        is: '',
        then: Joi.string().valid('X').required(),
        otherwise: Joi.string().valid('').required()
      }),
      WERKS: Joi.string().required(),
      AUFNR: Joi.string().required(),
      LANGU: Joi.string().valid('1', 'E', 'M').required()
    })
  )
};

module.exports = {
  getCAUFVD
};
