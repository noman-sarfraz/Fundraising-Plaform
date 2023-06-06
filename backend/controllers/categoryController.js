const Category = require("../models/Category");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllCategories = async (req, res) => {
  const categories = await Category.find({});
  res.status(StatusCodes.OK).json({ categories, count: categories.length });
};

const getCategory = async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findOne({ _id: categoryId });

  if (!category) {
    throw new NotFoundError(`No category found with the Id ${categoryId}`);
  }
  res.status(StatusCodes.OK).json({ category });
};

const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(StatusCodes.CREATED).json({ bank: category });
};

const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const name = req.body.name;

  if (name === "") {
    throw new BadRequestError("Name cannot be empty");
  }

  const category = await Category.findOneAndUpdate(
    { _id: categoryId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!category) {
    throw new NotFoundError(`No category found with the Id ${categoryId}`);
  }
  res.status(StatusCodes.OK).json({ category });
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findOneAndRemove({
    _id: categoryId,
  });
  if (!category) {
    throw new NotFoundError(`No category found with the Id ${categoryId}`);
  }

  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
