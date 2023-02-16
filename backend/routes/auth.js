const express = require("express");
const router = express.Router();

const {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
