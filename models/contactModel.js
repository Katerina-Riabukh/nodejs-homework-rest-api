const { model, Schema } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "This email already exists."],
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Contact = model("Contact", contactSchema);

module.exports = Contact;
