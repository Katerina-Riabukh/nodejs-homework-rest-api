const User = require("../models/userModel");
const { errorHendler } = require("../helpers");
const { signToken } = require("./jwtService");
const AvatarServise = require("./avatarServise");

exports.registerUser = async (userData) => {
  const newUser = await User.create(userData);

  newUser.password = undefined;

  const token = signToken(newUser.id);

  return { user: newUser, token };
};

exports.loginUser = async (userData) => {
  const user = await User.findOne({ email: userData.email }).select(
    "+password"
  );
  if (!user) throw errorHendler(401, "Email or password is wrong.");

  const passwordIsValid = await user.checkPassword(
    userData.password,
    user.password
  );
  if (!passwordIsValid) throw errorHendler(401, "Email or password is wrong.");

  user.password = undefined;

  const token = signToken(user.id);
  await User.findByIdAndUpdate(user._id, { token });

  return { user, token };
};

exports.logoutUser = async (id) => {
  const user = await User.findByIdAndUpdate(id, { token: "" });

  return user;
};

exports.updateSubscription = async (id, userData) => {
  const subscription = await User.findByIdAndUpdate(id, userData);

  return subscription;
};

exports.updateUserData = async (userData, user, file) => {
  console.log(userData, user, file);
  if (file) {
    // user.avatarURL = file.path.replace("pablic", "");
    user.avatarURL = await AvatarServise.save(file, null, "avatar");
  }
  Object.keys(userData).forEach((key) => {
    user[key] = userData[key];
  });

  return user.save();
};

exports.checkUserExists = async (filter) => {
  const userExists = await User.exists(filter);

  if (userExists) throw errorHendler(409, "Email in use.");
};