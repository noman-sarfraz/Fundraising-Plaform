const express = require("express");
const router = express.Router();

const Authentication = require("../middleware/Authentication");

const {
  getAllBanks,
  getBank,
  createBank,
  updateBank,
  deleteBank,
} = require("../controllers/bankController");

router
  .route("/")
  .get(Authentication.user, getAllBanks)
  .post(Authentication.admin, createBank);
router
  .route("/:id")
  .get(Authentication.user, getBank)
  .patch(Authentication.admin, updateBank)
  .delete(Authentication.admin, deleteBank);

module.exports = router;
