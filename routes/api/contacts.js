const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const { contactMiddelware, authenticate } = require("../../middlewares");

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
  .get(authenticate, listContacts)
  .post(authenticate, contactMiddelware.checkContactData, addContact);
router.use("/:id", authenticate, contactMiddelware.checkContactId);
router
  .route("/:id")
  .get(authenticate, getContactById)
  .delete(authenticate, removeContact)
  .put(authenticate, contactMiddelware.checkContactData, updateContact);

router.route("/:id/favorite").patch(authenticate, addToFavoriteList);

module.exports = router;
