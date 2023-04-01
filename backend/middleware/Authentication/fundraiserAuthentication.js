const { isTokenValid } = require("../../utils/jwt");
const { UnauthenticatedError } = require("../../errors");

const auth = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    if (req.user.role !== "Fundraiser") {
      throw new UnauthenticatedError("Authentication invalid");
    }
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = auth;
