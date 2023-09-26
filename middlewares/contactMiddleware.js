const { Types } = require("mongoose");
const Contact = require("../models/contactModel");
const { errorHendler, wraper } = require("../helpers");
const { createContactsDataValidator } = require("../validation/joiValidators");

exports.checkContactId = wraper(async (req, res, next) => {
  const { id } = req.params;

  const idIsValid = Types.ObjectId.isValid(id);
  if (!idIsValid) throw errorHendler(404, "Contact does not exist");

  const contactExist = await Contact.exists({ _id: id });

  if (!contactExist) {
    throw errorHendler(404, "Contact does not exist");
  }

  next();
});

exports.checkContactData = wraper(async (req, res, next) => {
  const { error } = createContactsDataValidator(req.body);

  if (error) {
    throw errorHendler(400, error.message);
  }

  next();
});
