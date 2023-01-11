const Fundraiser = require("../models/Fundraiser");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

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
  res.status(StatusCodes.OK).json({ fundraiser });
};

module.exports = {
  getFundraiser,
  updateFundraiser,
};
