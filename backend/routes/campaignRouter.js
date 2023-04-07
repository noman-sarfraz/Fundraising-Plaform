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
} = require("../controllers/campaignController");

router
  .route("/")
  .get(Authentication.fundraiser, getMyCampaigns)
  .post(Authentication.fundraiser, createCampaign);

// for admin to get all campaigns of all fundraisers 
router
  .route("/get-all")
  .get(Authentication.admin, getAllCampaigns)

// made for donors to see all approved campaigns
router
  .route("/get-approved")
  .get(Authentication.user, getApprovedCampaigns);


router
  .route("/:id")
  .get(Authentication.user, getCampaign)
  .patch(Authentication.fundraiser, updateCampaign)
  .delete(Authentication.fundraiser, deleteCampaign);
router.route("/change-status/:id").patch(Authentication.admin, changeStatus);

module.exports = router;
