const createTokenUser = require("./createTokenUser");
const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");
const checkPermissions = require("./checkPermissions");
const sendResetPasswordEmail = require("./sendResetPasswordEmail");
const sendVerificationEmail = require("./sendVerificationEmail");

module.exports = {
  createTokenUser,
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  checkPermissions,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
