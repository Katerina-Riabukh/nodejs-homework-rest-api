const { wraper } = require("../helpers");
const Email = require("../services/emailService");
const userService = require("../services/userService");
require("dotenv").config();

// const { BASE_URL } = process.env;

const registration = wraper(async (req, res) => {
  const { user, token } = await userService.registerUser(req.body);

  try {
    await new Email(
      user,
      `http://localhost:3000/api/users/verify/${user.verificationToken}`
    ).sendHello();
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({
    message: "Created",
    user,
    token,
  });
});

const login = wraper(async (req, res) => {
  const { user, token } = await userService.loginUser(req.body);

  res.status(200).json({
    message: "Success",
    user,
    token,
  });
});

const logout = wraper(async (req, res) => {
  const { id } = req.user;
  await userService.logoutUser(id);

  res.send(204);
});

const current = wraper(async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    message: "Success",
    email,
    subscription,
  });
});

const update = wraper(async (req, res) => {
  const { id } = req.user;
  const user = await userService.updateSubscription(id, req.body);

  res.status(200).json({
    message: "Success",
    user,
  });
});

const updateUser = wraper(async (req, res) => {
  const result = await userService.updateUserData(req.body, req.user, req.file);

  res.status(200).json({
    message: "Success",
    result,
  });
});

const verify = wraper(async (req, res) => {
  const { verificationToken } = req.params;

  await userService.verifyUser(verificationToken);

  res.status(200).json({
    message: "Verification successful",
  });
});

const verifyResend = wraper(async (req, res) => {
  const { email } = req.body;
  const user = await userService.emailVerifyResend(email);

  try {
    await new Email(
      user,
      `http://localhost:3000/api/users/verify/${user.verificationToken}`
    ).sendHello();
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    message: "Verification email sent",
  });
});

module.exports = {
  registration,
  login,
  logout,
  current,
  update,
  updateUser,
  verify,
  verifyResend,
};
