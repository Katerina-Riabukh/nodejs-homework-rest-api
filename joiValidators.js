const Joi = require("joi");

exports.createContactsdatavalidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    })
    .validate(data);
