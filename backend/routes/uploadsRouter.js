const express = require("express");
const router = express.Router();

const Authentication = require("../middleware/Authentication");
const { uploadImage } = require("../controllers/uploadsController");

router.route("/image").post(Authentication.user, uploadImage);

module.exports = router;
