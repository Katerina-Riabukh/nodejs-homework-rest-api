const fs = require("fs/promises");
const uuid = require("uuid").v4;
const { createContactsdatavalidator } = require("../joiValidators");
const { wraper, errorHendler } = require("../helpers");

const listContacts = async (req, res) => {
  const contacts = req.contacts;
  res.status(200).json({
    message: "Success",
    contacts,
  });
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contacts = req.contacts;
  const contactById = contacts.find((contact) => contact.id === id);

  if (!contactById) {
    throw errorHendler(404, "Contact does not exist");
  }
  res.status(200).json({
    message: "Success",
    contactById,
  });
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const contacts = req.contacts;

  const deleteContact = contacts.find((contact) => contact.id === id);
  if (!deleteContact) {
    throw errorHendler(404, "Not found");
  }

  const newContacts = contacts.filter((contact) => {
    return contact.id !== id;
  });
  await fs.writeFile(
    "./models/contacts.json",
    JSON.stringify(newContacts, null, 3)
  );

  res.status(200).json({
    message: "Contact deleted",
    deleteContact,
  });
};

const addContact = async (req, res) => {
  const { error, value } = createContactsdatavalidator(req.body);

  if (error) {
    throw errorHendler(400, error.message);
  }
  const { name, email, phone } = value;

  const newContact = {
    name,
    email,
    phone,
    id: uuid(),
  };
  const contacts = req.contacts;

  contacts.push(newContact);

  await fs.writeFile(
    "./models/contacts.json",
    JSON.stringify(contacts, null, 3)
  );

  res.status(201).json({
    message: "Created",
    contact: newContact,
  });
};

const updateContact = async (req, res) => {
  const { error, value } = createContactsdatavalidator(req.body);

  if (error) {
    throw errorHendler(400, error.message);
  }

  const { id } = req.params;
  const contacts = req.contacts;
  const index = contacts.findIndex((contact) => contact.id === id);
  console.log(index);
  if (index === -1) {
    throw errorHendler(400, "Contact does not exist");
  }
  contacts[index] = { id, ...value };

  await fs.writeFile(
    "./models/contacts.json",
    JSON.stringify(contacts, null, 3)
  );
  res.status(200).json({
    message: "Updated successfully",
    contacts,
  });
};

module.exports = {
  listContacts: wraper(listContacts),
  getContactById: wraper(getContactById),
  removeContact: wraper(removeContact),
  addContact: wraper(addContact),
  updateContact: wraper(updateContact),
};
