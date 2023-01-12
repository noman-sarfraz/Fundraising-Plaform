const Donor = require("../models/Donor");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcryptjs");


const getDonor = async (req, res) => {
  const { userId: donorId } = req.user;
  const donor = await Donor.findOne({
    _id: donorId,
  });
  if (!donor) {
    throw new NotFoundError(`No donor with id: ${donorId}`);
  }

  res.status(StatusCodes.OK).json({ donor });
};

const updateDonor = async (req, res) => {
  const { userId: donorId } = req.user;
  const donor = await Donor.findByIdAndUpdate(
    { _id: donorId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!donor) {
    throw new NotFoundError(`No donor with id: ${donorId}`);
  }
  res.status(StatusCodes.OK).json({ donor });
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const donor = await Donor.findById(req.user.userId).exec();
  if (!donor) {
    throw new UnauthenticatedError("Invalid User!");
  }
  const isPasswordCorrect = await donor.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Wrong Password!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  const newDonor = await Donor.findByIdAndUpdate(
    { _id: req.user.userId },
    { password: hashedPassword },
    { new: true, runValidators: true }
  );
  if (!newDonor) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Something went wrong" });
  }
  res.status(StatusCodes.OK).json({ newPassword: newPassword });
};

const deleteAccount = async (req, res) => {
  const donor = await Donor.findByIdAndRemove({
    _id: req.user.userId,
  });
  if (!donor) {
    throw new NotFoundError(`No such user with id: ${req.user.userId}`);
  }
  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  getDonor,
  updateDonor,
  changePassword,
  deleteAccount,
};
