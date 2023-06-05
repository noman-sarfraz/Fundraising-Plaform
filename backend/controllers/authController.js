const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");
const Token = require("../models/Token");

const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../utils");

const {
  UnauthenticatedError,
  BadRequestError,
  UnauthorizedError,
} = require("../errors");

const register = async (req, res) => {
  const { email, role } = req.body;

  // error if role passed is admin
  if (role === "Admin") {
    throw new UnauthorizedError("Cannot create an admin account");
  }
  // error if email already exists
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already exists");
  }

  // create verification passwordToken
  const verificationToken = crypto.randomBytes(40).toString("hex");
  req.body.verificationToken = verificationToken;

  //create user
  const user = await User.create({ ...req.body });

  // send verification email
  const origin = "http://localhost:3000";
  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  res.status(StatusCodes.CREATED).json({
    msg: "Success! Please check your email to verify account",
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });

  // if no user with this email
  if (!user) {
    throw new UnauthenticatedError("Verification Failed");
  }

  // if verification passwordToken doesn't match
  if (user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError("Verification Failed");
  }

  // user verified
  (user.isVerified = true), (user.verified = Date.now());
  user.verificationToken = "";

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Email Verified" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // email or password is missing
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  // no user found with this email
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);

  // password incorrent
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // email is not verified
  if (!user.isVerified) {
    throw new UnauthenticatedError("Please verify your email");
  }
  const tokenUser = createTokenUser(user);

  // create refresh passwordToken
  let refreshToken = "";
  // check for existing passwordToken
  const existingToken = await Token.findOne({ user: user._id });

  // if passwordToken exists attach cookie with that passwordToken
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }

  // create new refresh passwordToken
  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  // error if email is not provided
  if (!email) {
    throw new BadRequestError("Please provide valid email");
  }

  // find user
  const user = await User.findOne({ email });

  // if user exists send reset password email
  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    // send email
    const origin = "http://localhost:3000";
    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      passwordToken,
      origin,
    });

    // set password passwordToken and expiry
    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    // user.passwordToken = createHash(passwordToken);
    user.passwordToken = passwordToken;
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for reset password link" });
};

const resetPassword = async (req, res) => {
  const { passwordToken, email, password } = req.body;
  // error if any of the values is missing
  if (!passwordToken || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  // find user
  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();

    // if passwordToken is same as passed in req body
    // and passwordToken isn't expired
    // update user
    if (
      user.passwordToken === passwordToken &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;

      // save updated values
      await user.save();
    }
  }

  res.status(StatusCodes.OK).json({ msg: "password updated successfully" });
};

module.exports = {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  logout,
};
