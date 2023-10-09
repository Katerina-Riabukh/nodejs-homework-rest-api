const { wraper, errorHendler } = require("../helpers");
const { checkUserExists } = require("../services/userService");
const {
  createUserDataValidator,
  loginUserDataValidator,
} = require("../validation/joiValidators");

exports.checkRegisterUserData = wraper(async (req, res, next) => {
  const { error, value } = createUserDataValidator(req.body);

  if (error) {
    throw errorHendler(400, error.message);
  }

  await checkUserExists({ email: value.email });

  req.body = value;

  next();
});

exports.checkLoginUserData = wraper(async (req, res, next) => {
  const { error } = loginUserDataValidator(req.body);

  if (error) {
    throw errorHendler(401, "Something wrong...");
  }

  next();
});
