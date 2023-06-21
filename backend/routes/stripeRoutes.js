const express = require("express");
const router = express.Router();

const { cardPayment } = require("../controllers/accountController");

router.route("/card-payment").post(cardPayment);

module.exports = router;
