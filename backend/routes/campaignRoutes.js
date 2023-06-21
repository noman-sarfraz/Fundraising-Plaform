const express = require("express");
const router = express.Router();

// Middleware
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authenticate-user");

// Campaign Admin Controller Routes
const {
  getAllCampaigns,
  changeStatus,
} = require("../controllers/campaign/campaignAdminController");

router
  .route("/get-all")
  .get(authenticateUser, authorizePermissions("Admin"), getAllCampaigns);

router
  .route("/change-status/:id")
  .patch(authenticateUser, authorizePermissions("Admin"), changeStatus);

// Campaign General Controller Routes
const {
  addDonationAmount,
  getCampaign,
  getApproved,
  getFundraiserInfo,
  changeIsStopped,
  getAllDonations,
  getDonations,
} = require("../controllers/campaign/campaignGeneralController");

router.route("/get-approved").get(getApproved);
router.route("/fundraiser-info/:id").get(getFundraiserInfo);
router.route("/add-donation/:id").patch(authenticateUser, addDonationAmount);
router
  .route("/donations/get-all")
  .get(authenticateUser, authorizePermissions("Fundraiser"), getAllDonations);
router
  .route("/donations/:id")
  .get(authenticateUser, authorizePermissions("Fundraiser"), getDonations);
// Campaign CRUD Controller Routes
const {
  getMyCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaign/campaignCrudController");

router
  .route("/is-stopped/:id")
  .patch(authenticateUser, authorizePermissions("Fundraiser"), changeIsStopped);

router
  .route("/")
  .get(authenticateUser, authorizePermissions("Fundraiser"), getMyCampaigns)
  .post(authenticateUser, authorizePermissions("Fundraiser"), createCampaign);

router
  .route("/:id")
  .patch(authenticateUser, authorizePermissions("Fundraiser"), updateCampaign)
  .delete(authenticateUser, authorizePermissions("Fundraiser"), deleteCampaign);

// Campaign General Controller Routes
router.route("/:id").get(getCampaign);

module.exports = router;
