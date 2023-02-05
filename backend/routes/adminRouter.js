const express = require("express");
const adminRouter = express.Router();

const {
  getAdmin,
  updateAdmin,
  changePassword,
  deleteAccount,
  createAdmin
} = require("../controllers/adminController");


adminRouter.route("/").get(getAdmin).patch(updateAdmin).delete(deleteAccount);
adminRouter.route("/change-password").patch(changePassword);
adminRouter.route("/create-admin").post(createAdmin);

module.exports = adminRouter;