const express = require("express");

const router = express.Router();

// Middleware
const { authorizePermissions } = require("../middleware/authenticate-user");

const {
  createDonation,
  getDonation,
  getMyDonations,
  getDonationsOfCampaign,
} = require("../controllers/donationController");

router
  .route("/")
  .post(authorizePermissions("Donor"), createDonation)
  .get(authorizePermissions("Donor"), getMyDonations);

router.route("/get-donations/:id").get(getDonationsOfCampaign);
router.route("/:id").get(getDonation);
