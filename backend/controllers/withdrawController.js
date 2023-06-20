const Withdraw = require("../models/Withdraw");

const createWithdraw = async (accountId, amountWithdrawn, amountRemaining) => {
  const withdraw = await Withdraw.create({
    accountId,
    amountWithdrawn,
    amountRemaining,
  });

  return withdraw._id;
};

module.exports = {
  createWithdraw,
};
