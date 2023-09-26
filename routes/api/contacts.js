const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const { contactMiddelware } = require("../../middlewares");
// const path = require("path");

// const contactsPath = path.join(__dirname, "models", "contacts.json");
// console.log(__dirname);

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  addToFavoriteList,
} = require("../../controllers/contacts");

router.use(async (req, res, next) => {
  const data = await fs.readFile("./models/contacts.json");
  const contacts = JSON.parse(data);

  req.contacts = contacts;
  next();
});

router
  .route("/")
  .get(listContacts)
  .post(contactMiddelware.checkContactData, addContact);
router.use("/:id", contactMiddelware.checkContactId);
router
  .route("/:id")
  .get(getContactById)
  .delete(removeContact)
  .put(contactMiddelware.checkContactData, updateContact);

router.route("/:id/favorite").patch(addToFavoriteList);

module.exports = router;
