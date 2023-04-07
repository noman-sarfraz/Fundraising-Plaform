const express = require("express");
const router = express.Router();

const {
  getFundraise,
  getAllFundraises,
} = require("../controllers/tempController");

// router.route("/");

router.route("/:id").get(getFundraise);
router.route("/").get(getAllFundraises);

module.exports = router;
