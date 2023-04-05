const { StatusCodes } = require("http-status-codes");

const Donor = require("../models/Donor");
const Fundraiser = require("../models/Fundraiser");
const Admin = require("../models/Admin");
const Token = require("../models/Token");

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { attachCookiesToResponse } = require("../utils/jwt");
const createTokenUser = require("../utils/createTokenUser");

const sendVerificationEmail = require("../utils/sendVerificationEmail");
const sendResetPasswordEmail = require("../utils/sendResetPasswordEmail");

const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");

const register = async (req, res) => {
  const { role } = req.body;

  // create verification token
  const verificationToken = crypto.randomBytes(40).toString("hex");
  req.body.verificationToken = verificationToken;

  // create new user
  let user;
  if (role === "Donor") {
    user = await Donor.create({ ...req.body });
  } else if (role === "Fundraiser") {
    user = await Fundraiser.create({ ...req.body });
  } else {
    throw new BadRequestError("Please provide a valid role.");
  }

  // send verification email
  const origin = "front end link";
  await sendVerificationEmail(
    user.name,
    user.email,
    role,
    user.verificationToken,
    origin
  );
  res.status(StatusCodes.CREATED).json({ msg: "Please verify you email" });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email, role } = req.body;

  // find user with given email address
  let user;
  if (role === "Fundraiser") {
    user = await Fundraiser.findOne({ email });
  } else if (role === "Donor") {
    user = await Donor.findOne({ email });
  } else if (role === "Admin") {
    user = await Admin.findOne({ email });
  } else {
    throw new UnauthenticatedError("Verification failed!");
  }

  // throw error if no user
  if (!user) {
    throw new UnauthenticatedError("Verification failed!");
  }

  // throw error if verificationToken does not match
  if (user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError("Verification failed!");
  }

  // create object with updated values
  const updatedValues = {
    isVerified: true,
    verified: Date.now(),
    verificationToken: "",
  };

  // update the user
  if (role === "Fundraiser") {
    await Fundraiser.findOneAndUpdate({ email }, updatedValues);
  } else if (role === "Donor") {
    await Donor.findOneAndUpdate({ email }, updatedValues);
  } else if (role === "Admin") {
    await Admin.findOneAndUpdate({ email }, updatedValues);
  }

  res.status(StatusCodes.OK).json({ msg: "Email verified" });
};

const login = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    throw new BadRequestError("Please provide email, password and role.");
  }

  let user;
  if (role === "Donor") {
    user = await Donor.findOne({ email });
  } else if (role === "Fundraiser") {
    user = await Fundraiser.findOne({ email });
  } else if (role === "Admin") {
    user = await Admin.findOne({ email });
  } else {
    throw new BadRequestError("Please provide a valid role.");
  }

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  if (!user.isVerified) {
    throw new UnauthenticatedError("Please verify your email");
  }

  const tokenUser = createTokenUser(user, role);

  //create refresh token
  let refreshToken = "";
  //check for existing token
  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    refreshToken = existingToken.refreshToken;
  } else {
    refreshToken = crypto.randomBytes(40).toString("hex");
    const userAgent = req.headers["user-agent"];
    const ip = req.ip;
    const userToken = { refreshToken, ip, userAgent, user: user._id };

    await Token.create(userToken);
  }
  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const forgotPassword = async (req, res) => {
  // throw bad request error if any of the values is empty
  const { email, role } = req.body;
  if (!email || !role) {
    throw new BadRequestError("Please provide valid email and role");
  }

  // create passwordToken and expiry date
  // token is valid for 10 minutes
  const passwordToken = crypto.randomBytes(70).toString("hex");
  const currentDate = new Date();
  const passwordTokenExpirationDate = currentDate.setMinutes(
    currentDate.getMinutes() + 10
  );

  // create object with updated values
  const updatedValues = { passwordToken, passwordTokenExpirationDate };

  // update values of the user with given email
  let user;
  if (role === "Fundraiser") {
    user = await Fundraiser.findOneAndUpdate({ email }, updatedValues, {
      new: true,
    });
  } else if (role === "Donor") {
    user = await Donor.findOneAndUpdate({ email }, updatedValues, {
      new: true,
    });
  } else if (role === "Admin") {
    user = await Admin.findOneAndUpdate({ email }, updatedValues, {
      new: true,
    });
  }

  // if user exists send reset password email
  const origin = "front end link";
  if (user) {
    await sendResetPasswordEmail(
      user.name,
      user.email,
      role,
      user.passwordToken,
      origin
    );
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for reset password link" });
};

const resetPassword = async (req, res) => {
  // throw bad request error if any of the values is empty
  const { passwordToken, email, role, password } = req.body;
  if (!passwordToken || !email || !role || !password) {
    throw new BadRequestError("Please provide all values");
  }

  // hash the password passed in req body
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create object with updated values
  const updatedValues = {
    passwordToken: null,
    passwordTokenExpirationDate: null,
    password: hashedPassword,
  };
  // check whether the user with this email exists or not
  let user;
  if (role === "Fundraiser") {
    user = await Fundraiser.findOne({ email });
  } else if (role === "Donor") {
    user = await Donor.findOne({ email });
  } else if (role === "Admin") {
    user = await Admin.findOne({ email });
  }

  // if user exists
  if (user) {
    const currentDate = new Date();

    // if passwordToken is same as passed in req body
    // and token isn't expired
    // update user
    if (
      user.passwordToken === passwordToken &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      if (role === "Fundraiser") {
        await Fundraiser.findOneAndUpdate({ email }, updatedValues, {
          new: true,
        });
      } else if (role === "Donor") {
        await Donor.findOneAndUpdate({ email }, updatedValues, { new: true });
      } else if (role === "Admin") {
        await Admin.findOneAndUpdate({ email }, updatedValues, { new: true });
      }
    }
  }
  res.status(StatusCodes.OK).json({ msg: "password updated successfully" });
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
module.exports = {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  logout,
};
