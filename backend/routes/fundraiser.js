const express = require("express");
const router = express.Router();

const {
  getFundraiser,
  updateFundraiser,
  changePassword,
  deleteAccount
} = require("../controllers/fundraiser");

router
  .route("/")
  .get(getFundraiser)
  .patch(updateFundraiser)
  .delete(deleteAccount);
router.route("/change-password").patch(changePassword);

module.exports = router;
