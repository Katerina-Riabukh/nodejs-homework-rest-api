const { Router } = require("express");

const { userMiddlevare, authenticate } = require("../../middlewares");

const {
  registration,
  login,
  logout,
  current,
  update,
  updateUser,
} = require("../../controllers/userController");
// const { uploadUserAvatar } = require("../../middlewares/userMiddleware");

const router = Router();

router.post("/register", userMiddlevare.checkRegisterUserData, registration);
router.post("/login", userMiddlevare.checkLoginUserData, login);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, current);
router.patch("/update", authenticate, update);
router.patch(
  "/avatars",
  authenticate,
  userMiddlevare.uploadUserAvatar,
  updateUser
);

module.exports = router;