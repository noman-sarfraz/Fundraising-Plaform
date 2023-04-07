const Campaign = require("../models/Campaign");
const { StatusCodes } = require("http-status-codes");
const CustomErrors = require("../errors");

const getAllCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({}).sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({ campaigns, count: campaigns.length });
};

const getApprovedCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({ status: "Approved" }).sort({
    createdAt: -1,
  });
  res.status(StatusCodes.OK).json({ campaigns, count: campaigns.length });
};

const getMyCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({ createdBy: req.user.userId }).sort({
    createdAt: -1,
  });
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
  req.body.organizerName = req.user.name;
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
    { _id: campaignId },
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

const stopCampaign = async (req, res) => {
  const {
    params: { id: campaignId },
  } = req;

  let campaign = await Campaign.findOne({
    _id: campaignId,
  });

  if (!campaign) {
    throw new CustomErrors.NotFoundError(
      `No campaign found with the id ${campaignId}`
    );
  } else if (campaign.status === "Stopped") {
    throw new CustomErrors.BadRequestError(`Campaign is already stopped.`);
  } else if (campaign.status !== "Approved") {
    throw new CustomErrors.BadRequestError(
      `Campaign is not approved yet. Current status is ${campaign.status}`
    );
  }

  campaign = await Campaign.findOneAndUpdate(
    { _id: campaignId },
    { status: "Stopped" },
    { new: true, runValidators: true }
  );

  if (!campaign) {
    throw new CustomErrors.NotFoundError(
      `Account updation failed for campaign with id ${campaignId}`
    );
  }

  res.status(StatusCodes.OK).json({ campaign });
};

module.exports = {
  getAllCampaigns,
  getApprovedCampaigns,
  getMyCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  changeStatus,
  stopCampaign,
};
