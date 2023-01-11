const express = require("express");
const router = express.Router();

const {
  getDonor,
  updateDonor,
} = require("../controllers/donor");

router.route("/").get(getDonor).patch(updateDonor);

module.exports = router;
