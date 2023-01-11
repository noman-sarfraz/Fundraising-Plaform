const express = require("express");
const router = express.Router();

const {
  getFundraiser,
  updateFundraiser,
} = require("../controllers/fundraiser");

router.route("/").get(getFundraiser).patch(updateFundraiser);

module.exports = router;
