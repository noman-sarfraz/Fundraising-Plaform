const { isTokenValid } = require("../../utils/jwt");
const { UnauthenticatedError } = require("../../errors");

const auth = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload;
      if (req.user.role !== "Admin") {
        throw new UnauthenticatedError("Authentication invalid");
      }
      return next();
    }
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = auth;
