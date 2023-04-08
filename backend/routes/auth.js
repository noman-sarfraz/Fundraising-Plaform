const express = require("express");
const router = express.Router();

const Authentication = require("../middleware/Authentication");

const {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  logout,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", Authentication.user, logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
