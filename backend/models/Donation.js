const mongoose = require("mongoose");

const donationSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Please provide amount to donate"],
    },
    donorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: String,
    campaignId: {
      type: mongoose.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
