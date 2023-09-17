const fs = require("fs/promises");
const uuid = require("uuid").v4;
const { createContactsdatavalidator } = require("../joiValidators");

const listContacts = async (req, res, next) => {
  try {
    const data = await fs.readFile("./models/contacts.json");
    const contacts = JSON.parse(data);
    res.status(200).json({
      message: "Success",
      contacts,
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const data = await fs.readFile("./models/contacts.json");
  const contacts = JSON.parse(data);
  const contactById = contacts.find((contact) => contact.id === id);

  if (!contactById) {
    const err = new Error("Contact does not exist");
    err.status = 404;
    return next(err);
  }
  res.status(200).json({
    message: "Success",
    contactById,
  });
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile("./models/contacts.json");
  const contacts = JSON.parse(data);
  const newContacts = contacts.filter((contact) => contact.id !== id);
  await fs.writeFile(
    "./models/contacts.json",
    JSON.stringify(newContacts, null, 3)
  );

  res.status(200).json({
    message: "Contact deleted",
  });
};

const addContact = async (req, res, next) => {
  try {
    const { error, value } = createContactsdatavalidator(req.body);

    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      return next(err);
    }
    const { name, email, phone } = value;

    const newContact = {
      name,
      email,
      phone,
      id: uuid(),
    };

    const data = await fs.readFile("./models/contacts.json");
    const contacts = JSON.parse(data);

    contacts.push(newContact);

    await fs.writeFile(
      "./models/contacts.json",
      JSON.stringify(contacts, null, 3)
    );

    res.status(201).json({
      message: "Created",
      contact: newContact,
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error, value } = createContactsdatavalidator(req.body);

    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      return next(err);
    }

    const { id } = req.params;
    const data = await fs.readFile("./models/contacts.json");
    const contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contact.id === id);
    console.log(index);
    if (index === -1) return null;
    contacts[index] = { id, ...value };

    await fs.writeFile(
      "./models/contacts.json",
      JSON.stringify(contacts, null, 3)
    );
    res.status(200).json({
      message: "Updated successfully",
      contacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
