const { Contact } = require("../models");

exports.getListContacts = async (options, user) => {
  const { _id: owner } = user;

  const paginaPage = options.page ? +options.page : 1;
  const paginaLimit = options.limit ? +options.limit : 5;
  const contactToSkip = (paginaPage - 1) * paginaLimit;

  const contacts = await Contact.find({ owner })
    .skip(contactToSkip)
    .limit(paginaLimit);

  const result = await contacts;

  return result;
};
