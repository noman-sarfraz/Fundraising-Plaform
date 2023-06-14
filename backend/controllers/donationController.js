const Donation = require("../models/Donation");
const Campaign = require("../models/Campaign");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

const createDonation = async (req, res) => {
  // get userId and campaignId
  const {
    user: { userId },
    params: { id: campaignId },
  } = req;

  req.body.donorId = userId;
  req.body.campaignId = campaignId;

  // find campaign
  const campaign = await Campaign.find({ _id: campaignId });
  if (!campaign) {
    throw new NotFoundError("No campaign found with id ", campaignId);
  }

  // create donation and update campaign
  const donation = await Donation.create(req.body);
  if (donation) {
    campaign.amountCollected += donation.amount;
    campaign.noOfDonations++;
    campaign.donations.push(donation._id);
    await campaign.save();
  }

  res.status(StatusCodes.CREATED).json({ donation, campaign });
};

const getDonation = async (req, res) => {
  const {
    params: { id: donationId },
  } = req;

  const donation = await Donation.find({ _id: donationId });
  if (!donation) {
    throw new NotFoundError(`No donation found with id, ${donationId}`);
  }

  res.status(StatusCodes.OK).json({ donation });
};

const getMyDonations = async (req, res) => {
  const {
    user: { userId },
  } = req;

  const donations = await Donation.find({ donorId: userId });
  res.status(StatusCodes.OK).json({ donations });
};

const getDonationsOfCampaign = async (req, res) => {
  const {
    params: { id: campaignId },
  } = req;

  const donations = await Donation.find({ campaignId });
  res.status(StatusCodes.OK).json({ donations });
};

module.exports = {
  createDonation,
  getDonation,
  getMyDonations,
  getDonationsOfCampaign,
};
