const Fundraiser = require("../models/Fundraiser");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const bcrypt = require("bcryptjs");
const Campaign = require("../models/Campaign");

const getFundraise = async (req, res) => {
  const {
    params: { id: campaignId },
  } = req;
  const campaign = await Campaign.findOne({
    _id: campaignId,
  });

  if (!campaign) {
    throw new CustomErrors.NotFoundError(
      `No campaign found with the id ${campaignId}`
    );
  }

  const fundraiserId = campaign.createdBy;
  const fundraiser = await Fundraiser.findOne({
    _id: fundraiserId,
  });
  if (!fundraiser) {
    throw new NotFoundError(`No fundraiser with id: ${fundraiserId}`);
  }

  res.status(StatusCodes.OK).json({ campaign, fundraiser });
};

const getAllFundraises = async (req, res) => {
  let campaigns = await Campaign.find({}).sort("-createdAt");
  // campaigns = campaigns.map( async (campaign) => {
  //   const fundraiserId = campaign.createdBy;
  //   const fundraiser = await Fundraiser.findOne({
  //     _id: fundraiserId,
  //   });
  //   campaign.fundraiser = fundraiser;
  //   return campaign;
  // })

  res.status(StatusCodes.OK).json({ campaigns, count: campaigns.length });
};

module.exports = {
  getFundraise,
  getAllFundraises,
};
