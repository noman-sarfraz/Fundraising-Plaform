const express = require("express");
const router = express.Router();

const Authentication = require("../middleware/Authentication");

const {
  getAllCampaigns,
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
router.route("/get-all").get(getAllCampaigns);

router
  .route("/:id")
  .get(getCampaign)
  .patch(Authentication.fundraiser, updateCampaign)
  .delete(Authentication.fundraiser, deleteCampaign);
router.route("/change-status/:id").patch(Authentication.admin, changeStatus);

module.exports = router;
