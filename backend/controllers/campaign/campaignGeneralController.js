const Campaign = require("../../models/Campaign");
const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../errors");

const addDonationAmount = async (req, res) => {
  const amount = req.body.amount;
  if (amount <= 0) {
    throw new BadRequestError("Amount raised must be greater than 0");
  }

  const {
    params: { id: campaignId },
  } = req;

  const campaign = await Campaign.findOne({ _id: campaignId });
  if (!campaign) {
    throw new NotFoundError(`No campaign found with the id ${campaignId}`);
  }

  campaign.amountCollected += amount;
  campaign.noOfDonations++;

  await campaign.save();
  res.status(StatusCodes.OK).json({ campaign });
};

const getCampaign = async (req, res) => {
  const {
    params: { id: campaignId },
  } = req;
  const campaign = await Campaign.findOne({
    _id: campaignId,
  });

  if (!campaign) {
    throw new NotFoundError(`No campaign found with the id ${campaignId}`);
  }

  res.status(StatusCodes.OK).json({ campaign });
};

const getApproved = async (req, res) => {
  const campaigns = await Campaign.find({ status: "Approved" });

  if (!campaigns) {
    throw new NotFoundError("No approved campaign found!");
  }
  res.status(StatusCodes.OK).json({ campaigns, count: campaigns.length });
};

const getFundraiserInfo = async (req, res) => {
  const {
    params: { id: campaignId },
  } = req;
  const campaign = await Campaign.findOne({
    _id: campaignId,
  });

  if (!campaign) {
    throw new NotFoundError(`No campaign found with the id ${campaignId}`);
  }

  const fundraiserId = campaign.createdBy;
  const fundraiser = await User.findOne({
    _id: fundraiserId,
  });
  if (!fundraiser) {
    throw new NotFoundError(`No fundraiser with id: ${fundraiserId}`);
  }

  res.status(StatusCodes.OK).json({ campaign, fundraiser });
};
module.exports = {
  addDonationAmount,
  getCampaign,
  getApproved,
  getFundraiserInfo,
};
