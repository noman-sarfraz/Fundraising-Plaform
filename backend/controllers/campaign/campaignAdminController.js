const Campaign = require("../../models/Campaign");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({});
  res.status(StatusCodes.OK).json({ campaigns, count: campaigns.length });
};

const changeStatus = async (req, res) => {
  const status = req.body.status;
  if (!status || status === "Pending") {
    throw new BadRequestError("Please provide status value to update");
  }

  const {
    params: { id: campaignId },
  } = req;

  req.body.isStopped = false;
  req.body.startDate = new Date(Date.now());

  const campaign = await Campaign.findOneAndUpdate(
    { _id: campaignId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!campaign) {
    throw new NotFoundError(`No campaign found with the id ${campaignId}`);
  }

  res.status(StatusCodes.OK).json({ campaign });
};

module.exports = {
  getAllCampaigns,
  changeStatus,
};
