// const multer = require("multer");
// const uuid = require("uuid").v4;
const { wraper, errorHendler } = require("../helpers");
const { checkUserExists } = require("../services/userService");
const {
  createUserDataValidator,
  loginUserDataValidator,
  emailVerifyValidator,
} = require("../validation/joiValidators");
const AvatarServise = require("../services/avatarServise");

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

exports.checkEmailVerify = wraper(async (req, res, next) => {
  const { error } = emailVerifyValidator(req.body);

  if (error) {
    throw errorHendler(400, "Something wrong...");
  }

  next();
});

exports.uploadUserAvatar = AvatarServise.initUploadMiddelware("avatar");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cbk) => {
//     cbk(null, "public/avatar");
//   },
//   filename: (req, file, cbk) => {
//     const extension = file.mimetype.split("/")[1];

//     cbk(null, `${req.user.id}-${uuid()}.${extension}`);
//   },
// });

// const multerFilter = (req, file, cbk) => {
//   if (file.mimetype.startsWith("image/")) {
//     cbk(null, true);
//   } else {
//     cbk(errorHendler(400, "Please, upload images only!!!"), false);
//   }
// };

// exports.uploadUserAvatar = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
//   limits: {
//     fileSize: 2 * 1024 * 1024,
//   },
// }).single("avatar");
