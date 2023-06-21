const Campaign = require("../../models/Campaign");
const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../errors");
const Donation = require("../../models/Donation");

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

const changeIsStopped = async (req, res) => {
  const {
    user: { userId },
    params: { id: campaignId },
  } = req;

  if (!req.body.isStopped) {
    throw new BadRequestError(`isStopped required`);
  }

  const campaign = await Campaign.findOne({
    _id: campaignId,
    createdBy: userId,
  });
  if (!campaign) {
    throw new NotFoundError(`No campaign found with id ${campaignId}`);
  }

  campaign.isStopped = req.body.isStopped;
  await campaign.save();

  res.status(StatusCodes.OK).json({ campaign });
};

const addDonation = async (campaignId, donationId, amount) => {
  const campaign = await Campaign.findById(campaignId);
  campaign.noOfDonations++;
  campaign.amountCollected += amount;
  campaign.donations.push(donationId);

  await campaign.save();
};

const getAllDonations = async (req, res) => {
  const {
    user: { userId },
  } = req;

  // get all campaigns
  const campaigns = await Campaign.find({ createdBy: userId });
  if (!campaigns) {
    throw new NotFoundError(`No campaigns found`);
  }

  let allDonations = [];
  // loop through all campaigns
  for (const campaign of campaigns) {
    const donations = campaign.donations;
    for (const donation of donations) {
      let d = await Donation.findById(donation);

      let donationInfo = {};
      donationInfo.donationId = d._id;
      donationInfo.amount = d.amount;
      donationInfo.comment = d.comment;
      donationInfo.createdAt = d.createdAt;
      donationInfo.campaignId = campaign._id;
      donationInfo.title = campaign.title;
      donationInfo.image = campaign.image;

      allDonations.push(donationInfo);
    }
  }
  res.status(StatusCodes.OK).json({ allDonations, count: allDonations.length });
};

const getDonations = async (req, res) => {
  const {
    user: { userId },
    params: { id: campaignId },
  } = req;

  const campaign = await Campaign.findOne({
    _id: campaignId,
    createdBy: userId,
  });
  if (!campaign) {
    throw new NotFoundError(`No campaign found with id ${campaignId}`);
  }

  let allDonations = [];
  for (const donation of campaign.donations) {
    const d = await Donation.findById(donation);
    d.campaignId = campaign._id;
    d.title = campaign.title;
    d.image = campaign.image;
    allDonations.push(d);
  }

  res.status(StatusCodes.OK).json({ allDonations, count: allDonations.length });
};

module.exports = {
  addDonationAmount,
  getCampaign,
  getApproved,
  getFundraiserInfo,
  changeIsStopped,
  addDonation,
  getAllDonations,
  getDonations,
};
