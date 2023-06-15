const Joi = require('joi');

const getAUFNR = {
  body: Joi.object().keys({
    AUFNR: Joi.array().items(
      Joi.object().keys({
        OPTION: Joi.string().required(),
        LOW: Joi.string().max(12).required(),
        HIGH: Joi.string().max(12).allow('')
      })
    ),
    WERKS: Joi.array().items(
      Joi.object().keys({
        OPTION: Joi.string().required(),
        LOW: Joi.string().max(4).required(),
        HIGH: Joi.string().max(4).allow('')
      })
    ),
    PLNBEZ: Joi.array().items(
      Joi.object().keys({
        OPTION: Joi.string().required(),
        LOW: Joi.string().max(50).required(),
        HIGH: Joi.string().max(50).allow('')
      })
    ),
    AUART: Joi.array().items(
      Joi.object().keys({
        OPTION: Joi.string().required(),
        LOW: Joi.string().max(4).required(),
        HIGH: Joi.string().max(4).allow('')
      })
    ),
    DISPO: Joi.array().items(
      Joi.object().keys({
        OPTION: Joi.string().required(),
        LOW: Joi.string().max(3).required(),
        HIGH: Joi.string().max(3).allow('')
      })
    ),
    FEVOR: Joi.array().items(
      Joi.object().keys({
        OPTION: Joi.string().required(),
        LOW: Joi.string().max(3).required(),
        HIGH: Joi.string().max(3).allow('')
      })
    ),
    GSTRP: Joi.array().items(
      Joi.object().keys({
        OPTION: Joi.string().required(),
        LOW: Joi.string().max(8).required(),
        HIGH: Joi.string().max(8).allow('')
      })
    ),
    GLTRP: Joi.array().items(
      Joi.object().keys({
        OPTION: Joi.string().required(),
        LOW: Joi.string().max(8).required(),
        HIGH: Joi.string().max(8).allow('')
      })
    ),
    KTEXT: Joi.array().items(
      Joi.object().keys({
        OPTION: Joi.string().required(),
        LOW: Joi.string().max(50).required(),
        HIGH: Joi.string().max(50).allow('')
      })
    )
  })
};

module.exports = {
  getAUFNR
};
