const express = require("express");
const router = express.Router();
const { authorizePermissions } = require("../middleware/authenticate-user");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  createAdmin,
  deleteUser,
} = require("../controllers/userController");

router
  .route("/")
  .get(authorizePermissions("Admin"), getAllUsers)
  .patch(updateUser)
  .delete(deleteUser);

router.route("/show-me").get(showCurrentUser);
router.route("/update-password").patch(updateUserPassword);
router.route("/create-admin").post(createAdmin);

router.route("/:id").get(getSingleUser);

module.exports = router;
