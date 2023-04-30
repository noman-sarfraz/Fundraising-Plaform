const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
} = require("../utils");

const crypto = require("crypto");

const {
  UnauthenticatedError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../errors");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({}).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new NotFoundError(`No user with id : ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  //throws error if role other than assigned is passed
  if (req.body.role && req.body.role != req.user.role) {
    throw new BadRequestError("Role of a user cannot be updated");
  }
  //throws error if trying to change password
  if (req.body.password) {
    throw new BadRequestError("Password cannot be updated from this route");
  }
  //update user and return updated user
  const user = await User.findByIdAndUpdate(
    { _id: req.user.userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  //error if user not found
  if (!user) {
    throw new NotFoundError(`No user with id: ${donorId}`);
  }

  // creates token using updated values and attaches to cookies
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const updateUserPassword = async (req, res) => {
  // throws error if one of the passwords is missing
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please provide both values");
  }
  //get user
  const user = await User.findOne({ _id: req.user.userId });

  // comapares old password with the one stored in DB
  // throws error if password is incorrect
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // sets new password ans saves user
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
};

const createAdmin = async (req, res) => {
  const { role } = req.body;

  // create verification token
  const verificationToken = crypto.randomBytes(40).toString("hex");
  req.body.verificationToken = verificationToken;

  let user;
  if (role === "Admin") {
    user = await User.create({ ...req.body });
  } else {
    throw new BadRequestError("Please provide a valid role.");
  }

  // send verification email
  const origin = "front end link";
  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  res.status(StatusCodes.CREATED).json({ msg: "Verification email sent" });
};

const deleteUser = async (req, res) => {
  //throws error if requesting account is the only admin account
  if (req.user.role == "Admin") {
    const admins = await User.find({ role: req.user.role });
    console.log(admins);
    if (admins.length <= 1) {
      throw new BadRequestError("Platform must have atleast one Admin account");
    }
  }

  // finds and deletes user
  const user = await User.findByIdAndRemove({
    _id: req.user.userId,
  });

  // error if no user found
  if (!user) {
    throw new NotFoundError(`No such user with id: ${req.user.userId}`);
  }
  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  createAdmin,
  deleteUser,
};
