const jwt = require("jsonwebtoken");
const { wraper, errorHendler } = require("../helpers");

const { User } = require("../models");

const authenticate = wraper(async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(errorHendler(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(errorHendler(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch {
    next(errorHendler(401, "Not authorized"));
  }
});

module.exports = authenticate;
