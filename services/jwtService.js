const jwt = require("jsonwebtoken");
// const { errorHendler } = require("../helpers");

exports.signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
