const Donation = require("../models/Donation");
const Campaign = require("../models/Campaign");

const {
  addDonation,
} = require("../controllers/campaign/campaignGeneralController");
const { addBalance } = require("../controllers/accountController");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createDonation = async (req, res) => {
  // validate amount entered
  if (req.body.amount <= 0) {
    throw new BadRequestError(`Donation amount must be greater than 0`);
  }

  // get userId and campaignId
  const {
    user: { userId },
  } = req;
  req.body.donorId = userId;
 
  // find campaign
  const campaign = await Campaign.findById(req.body.campaignId);
  if (!campaign) {
    throw new NotFoundError("No campaign found with id ", req.body.campaignId);
  }

  // create donation
  const donation = await Donation.create(req.body);

  // add donation in campaign
  // and add balance in account
  if (donation) {
    await addDonation(req.body.campaignId, donation._id, donation.amount);
    await addBalance(campaign.createdBy, donation.amount);
  }

  res.status(StatusCodes.CREATED).json({ donation });
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
