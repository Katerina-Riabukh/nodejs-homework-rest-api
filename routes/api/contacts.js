const express = require("express");
const router = express.Router();
const fs = require("fs/promises");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.use(async (req, res, next) => {
  const data = await fs.readFile("./models/contacts.json");
  const contacts = JSON.parse(data);
  req.contacts = contacts;
  next();
});

router.route("/").get(listContacts).post(addContact);

router
  .route("/:id")
  .get(getContactById)
  .delete(removeContact)
  .put(updateContact);

module.exports = router;
