const Joi = require("joi");

// const emailRegex = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;

exports.createContactsDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean(),
    })
    .validate(data);

exports.createUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      password: Joi.string().min(6).required(),
      email: Joi.string().required(),
      subscription: Joi.string(),
      token: Joi.string(),
    })
    .validate(data);

exports.loginUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      password: Joi.string().min(6).required(),
      email: Joi.string().required(),
    })
    .validate(data);
