const mongoose = require("mongoose");

const withdrawSchema = mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  amountWithdrawn: {
    type: Number,
    required: true,
  },
  amountRemaining: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Withdraw", withdrawSchema);
