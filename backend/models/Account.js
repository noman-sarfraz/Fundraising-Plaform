const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  withdraws: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
});

module.exports = mongoose.model("Account", accountSchema);
