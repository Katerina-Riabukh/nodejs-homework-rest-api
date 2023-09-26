const { wraper } = require("../helpers");
const Contact = require("../models/contactModel");

// GET:ALL
const listContacts = async (req, res) => {
  const contacts = await Contact.find();

  res.status(200).json({
    message: "Success",
    contacts,
  });
};

// GET:ID
const getContactById = async (req, res) => {
  const contactById = await Contact.findById(req.params.id);

  res.status(200).json({
    message: "Success",
    contactById,
  });
};

// DELETE
const removeContact = async (req, res) => {
  const deleteContact = await Contact.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "Contact deleted",
    deleteContact,
  });
};

// ADD
const addContact = async (req, res) => {
  const { name, email, phone, favorite } = req.body;

  const newContact = await Contact.create({
    name,
    email,
    phone,
    favorite,
  });

  res.status(201).json({
    message: "Created",
    contact: newContact,
  });
};

// UPDATE
const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    message: "Updated successfully",
    updatedContact,
  });
};

// FAVORITE
const addToFavoriteList = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  const newStatus = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  res.status(200).json({
    newStatus,
  });
};

module.exports = {
  listContacts: wraper(listContacts),
  getContactById: wraper(getContactById),
  removeContact: wraper(removeContact),
  addContact: wraper(addContact),
  updateContact: wraper(updateContact),
  addToFavoriteList: wraper(addToFavoriteList),
};
