const Donor = require("../models/Donor");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

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

module.exports = {
  getDonor,
  updateDonor,
};
