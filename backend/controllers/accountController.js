const Account = require("../models/Account");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const { createWithdraw } = require("../controllers/withdrawController");
const Withdraw = require("../models/Withdraw");

const createAccount = async (req, res) => {
  // get user id
  const {
    user: { userId },
  } = req;

  const account = await Account.create({ userId });
  res.status(StatusCodes.CREATED).json({ account });
};
const addBalance = async (userId, amount) => {
  //find account linked with this userId
  const account = await Account.findOne({ userId });
  if (!account) {
    throw new NotFoundError(`No account for userId ${userId}`);
  }
  // add donated amount to the balance
  account.balance += amount;
  await account.save();
  return account.balance;
};

const getBalance = async (req, res) => {
  // get user id
  const {
    user: { userId },
  } = req;
  //find account linked with this userId
  const account = await Account.findOne({ userId });
  if (!account) {
    throw new NotFoundError(`No account for userId ${userId}`);
  }

  // return balance in account
  res.status(StatusCodes.OK).json({ balance: account.balance });
};

const withdrawBalance = async (req, res) => {
  const {
    body: { amount },
    user: { userId },
  } = req;

  const account = await Account.findOne({ userId });
  if (account.balance < amount) {
    throw new BadRequestError(
      `Can not withdraw this amount. Available balance is ${account.balance}`
    );
  }

  account.balance -= amount;

  const withdrawId = await createWithdraw(account._id, amount, account.balance);
  account.withdraws.push(withdrawId);

  await account.save();
  res.status(StatusCodes.OK).json({ balance: account.balance });
};

const getWithdraws = async (req, res) => {
  const {
    user: { userId },
  } = req;

  let allWithdraws = [];
  const account = await Account.findOne({ userId });
  for (const withdraw of account.withdraws) {
    const w = await Withdraw.findById(withdraw);
    allWithdraws.push(w);
  }

  res.status(StatusCodes.OK).json({ allWithdraws, count: allWithdraws.length });
};
module.exports = {
  createAccount,
  addBalance,
  getBalance,
  withdrawBalance,
  getWithdraws,
};
