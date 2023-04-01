const Fundraiser = require("../models/Fundraiser");
const { StatusCodes } = require("http-status-codes");
const createTokenUser = require("../utils/createTokenUser");
const { attachCookiesToResponse } = require("../utils/jwt");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const bcrypt = require("bcryptjs");

const getFundraiser = async (req, res) => {
  const { userId: fundraiserId } = req.user;
  const fundraiser = await Fundraiser.findOne({
    _id: fundraiserId,
  });
  if (!fundraiser) {
    throw new NotFoundError(`No fundraiser with id: ${fundraiserId}`);
  }

  res.status(StatusCodes.OK).json({ fundraiser });
};

const updateFundraiser = async (req, res) => {
  const { userId: fundraiserId } = req.user;
  const fundraiser = await Fundraiser.findByIdAndUpdate(
    { _id: fundraiserId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!fundraiser) {
    throw new NotFoundError(`No fundraiser with id: ${fundraiserId}`);
  }
  const tokenUser = createTokenUser(donor);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ fundraiser });
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Provide credentials.");
  }
  const fundraiser = await Fundraiser.findById(req.user.userId).exec();
  if (!fundraiser) {
    throw new UnauthenticatedError("Invalid User!");
  }
  const isPasswordCorrect = await fundraiser.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Wrong Password!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  const newFundraiser = await Fundraiser.findByIdAndUpdate(
    { _id: req.user.userId },
    { password: hashedPassword },
    { new: true, runValidators: true }
  );
  if (!newFundraiser) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Something went wrong" });
  }
  res.status(StatusCodes.OK).json({ newPassword: newPassword });
};

const deleteAccount = async (req, res) => {
  const fundraiser = await Fundraiser.findByIdAndRemove({
    _id: req.user.userId,
  });
  if (!fundraiser) {
    // console.log(req.user)
    throw new NotFoundError(`No such user with id: ${req.user.userId}`);
  }
  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  getFundraiser,
  updateFundraiser,
  changePassword,
  deleteAccount,
};
