const { wraper } = require("../helpers");
const userService = require("../services/userService");

const registration = wraper(async (req, res) => {
  const { user, token } = await userService.registerUser(req.body);

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

module.exports = {
  registration,
  login,
  logout,
  current,
  update,
  updateUser,
};
