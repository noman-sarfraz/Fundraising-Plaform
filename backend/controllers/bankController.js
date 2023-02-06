const Bank = require("../models/Bank");
const { StatusCodes } = require("http-status-codes");
const CustomErrors = require("../errors");

const getAllBanks = async (req, res) => {
  const banks = await Bank.find({});
  res.status(StatusCodes.OK).json({ banks, count: banks.length });
};

const getBank = async (req, res) => {
  const bankId = req.params.id;
  const bank = await Bank.findOne({ _id: bankId });

  if (!bank) {
    throw new CustomErrors.NotFoundError(`No job found with the Id ${bankId}`);
  }
  res.status(StatusCodes.OK).json({ bank });
  //   res.send("get a bank");
};

const createBank = async (req, res) => {
  const bank = await Bank.create(req.body);
  res.status(StatusCodes.CREATED).json({ bank });
};

const updateBank = async (req, res) => {
  const bankId = req.params.id;
  const name = req.body.name;

  if (name === "") {
    throw new CustomErrors.BadRequestError("Name cannot be empty");
  }

  const bank = await Bank.findOneAndUpdate({ _id: bankId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bank) {
    throw new CustomErrors.NotFoundError(`No job found with the Id ${bankId}`);
  }
  res.status(StatusCodes.OK).json({ bank });
};

const deleteBank = async (req, res) => {
  const bankId = req.params.id;
  const bank = await Bank.findOneAndRemove({
    _id: bankId,
  });
  if (!bank) {
    throw new CustomErrors.NotFoundError(`No job found with the Id ${bankId}`);
  }

  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  getAllBanks,
  getBank,
  createBank,
  updateBank,
  deleteBank,
};
