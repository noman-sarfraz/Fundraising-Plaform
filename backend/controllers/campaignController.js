const Campaign = require("../models/Campaign");
const { StatusCodes } = require("http-status-codes");
const CustomErrors = require("../errors");
const sendCampaignStatusChangeEmail = require("../utils/sendCampaignStatusChangeEmail");

const getAllCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({});
  res.status(StatusCodes.OK).json({ campaigns, count: campaigns.length });
};

const getMyCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ campaigns, count: campaigns.length });
};

const getCampaign = async (req, res) => {
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

  res.status(StatusCodes.OK).json({ campaign });
};

const createCampaign = async (req, res) => {
  req.body.createdBy = req.user.userId;
  req.body.endDate = new Date(req.body.endDate);

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
    throw new CustomErrors.NotFoundError(
      `No campaign found with the id ${campaignId}`
    );
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
    throw new CustomErrors.NotFoundError(
      `No campaign found with the id ${campaignId}`
    );
  }

  const origin = "front end link";
  await sendCampaignStatusChangeEmail(
    user.name,
    user.email,
    role,
    origin
  );
  res.status(StatusCodes.OK).json({ success: true });
};

const changeStatus = async (req, res) => {
  const status = req.body.status;
  if (!status || status === "Pending") {
    throw new CustomErrors.BadRequestError(
      "Please provide status value to update"
    );
  }

  const {
    params: { id: campaignId },
  } = req;

  const campaign = await Campaign.findOneAndUpdate(
    { _id: campaignId},
    req.body,
    { new: true, runValidators: true }
  );

  if (!campaign) {
    throw new CustomErrors.NotFoundError(
      `No campaign found with the id ${campaignId}`
    );
  }

  res.status(StatusCodes.OK).json({ campaign });
};

module.exports = {
  getAllCampaigns,
  getMyCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  changeStatus,
};
