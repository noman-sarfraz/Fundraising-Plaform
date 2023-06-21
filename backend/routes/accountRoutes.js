const express = require("express");

const router = express.Router();

const { authorizePermissions } = require("../middleware/authenticate-user");
const {
  createAccount,
  getBalance,
  withdrawBalance,
  getWithdraws,
} = require("../controllers/accountController");

router.route("/").post(createAccount);
router
  .route("/get-balance")
  .get(authorizePermissions("Fundraiser"), getBalance);
router
  .route("/withdraw-balance")
  .post(authorizePermissions("Fundraiser"), withdrawBalance);

router
  .route("/get-withdraws")
  .get(authorizePermissions("Fundraiser"), getWithdraws);
module.exports = router;
