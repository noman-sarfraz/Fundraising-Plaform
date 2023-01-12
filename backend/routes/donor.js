const express = require("express");
const router = express.Router();

const {
  getDonor,
  updateDonor,
  changePassword,
  deleteAccount
} = require("../controllers/donor");

router.route("/").get(getDonor).patch(updateDonor).delete(deleteAccount);
router.route("/change-password").patch(changePassword);

module.exports = router;
