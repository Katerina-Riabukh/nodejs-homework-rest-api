const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.route("/").get(listContacts).post(addContact);

router
  .route("/:id")
  .get(getContactById)
  .delete(removeContact)
  .put(updateContact);

module.exports = router;
