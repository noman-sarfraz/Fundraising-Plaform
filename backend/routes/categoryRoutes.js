const express = require("express");
const router = express.Router();

// Middleware
const { authorizePermissions } = require("../middleware/authenticate-user");

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router
  .route("/")
  .get(getAllCategories)
  .post(authorizePermissions("Admin"), createCategory);
router
  .route("/:id")
  .get(getCategory)
  .patch(authorizePermissions("Admin"), updateCategory)
  .delete(authorizePermissions("Admin"), deleteCategory);

module.exports = router;
