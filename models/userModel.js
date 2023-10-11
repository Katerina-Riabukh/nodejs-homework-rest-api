const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { userSubscription } = require("../constants");
const crypto = require("crypto");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: Object.values(userSubscription),
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const emailHash = crypto.createHash("md5").update(this.email).digest("hex");
    this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=wavatar`;
  }

  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.checkPassword = (candidate, passwordHash) =>
  bcrypt.compare(candidate, passwordHash);

const User = model("User", userSchema);

module.exports = User;
