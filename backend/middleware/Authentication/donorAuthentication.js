const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../../errors");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payload.userId,
      name: payload.name,
      role: payload.role,
    };
    if (req.user.role !== "Donor") {
      throw new UnauthenticatedError("Authentication invalid");
    }
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  next();
};

module.exports = auth;
