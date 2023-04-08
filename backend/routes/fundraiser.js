const express = require("express");
const router = express.Router();

const Authentication = require("../middleware/Authentication");

const {
  showMe,
  getFundraiser,
  updateFundraiser,
  changePassword,
  deleteAccount,
} = require("../controllers/fundraiser");

router
  .route("/")
  .get(Authentication.fundraiser, showMe)
  .patch(Authentication.fundraiser, updateFundraiser)
  .delete(Authentication.fundraiser, deleteAccount);

router.route("/:id").get(getFundraiser);

router.route("/change-password").patch(changePassword);

module.exports = router;
