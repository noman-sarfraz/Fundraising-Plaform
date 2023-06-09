const Campaign = require("../../models/Campaign");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

const getMyCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ campaigns, count: campaigns.length });
};

const createCampaign = async (req, res) => {
  req.body.createdBy = req.user.userId;
  if (req.body.campaignType === "With End Date" && !req.body.endDate) {
    throw new BadRequestError(`Please provide end date`);
  }
  if (req.body.endDate) {
    req.body.endDate = new Date(req.body.endDate);
  }

  const campaign = await Campaign.create(req.body);
  res.status(StatusCodes.CREATED).json({ campaign });
};

const updateCampaign = async (req, res) => {
  const {
    user: { userId },
    params: { id: campaignId },
  } = req;

  if (req.body.endDate) {
    req.body.endDate = new Date(req.body.endDate);
  }
  const campaign = await Campaign.findOneAndUpdate(
    { _id: campaignId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!campaign) {
    throw new NotFoundError(`No campaign found with the id ${campaignId}`);
  }

  res.status(StatusCodes.OK).json({ campaign });
};

const deleteCampaign = async (req, res) => {
  const {
    user: { userId },
    params: { id: campaignId },
  } = req;
  const campaign = await Campaign.findOneAndRemove({
    _id: campaignId,
    createdBy: userId,
  });

  if (!campaign) {
    throw new NotFoundError(`No campaign found with the id ${campaignId}`);
  }

  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  getMyCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
};
