const express = require("express");
const router = express.Router();

const Authentication = require("../middleware/Authentication");

const {
  getAllCampaigns,
  getApprovedCampaigns,
  getMyCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  changeStatus,
  stopCampaign,
} = require("../controllers/campaignController");

router
  .route("/")
  .get(Authentication.fundraiser, getMyCampaigns)
  .post(Authentication.fundraiser, createCampaign);
router.route("/get-approved").get(Authentication.user, getApprovedCampaigns);
router.route("/get-all").get(Authentication.user, getAllCampaigns);

router
  .route("/:id")
  .get(Authentication.user, getCampaign)
  .patch(Authentication.fundraiser, updateCampaign)
  .delete(Authentication.fundraiser, deleteCampaign);
router.route("/change-status/:id").patch(Authentication.admin, changeStatus);
router.route("/stop/:id").patch(Authentication.fundraiser, stopCampaign);

module.exports = router;
