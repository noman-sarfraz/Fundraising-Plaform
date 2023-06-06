const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter campaign title"],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: [true, "Please enter campaign category"],
    },
    country: {
      type: String,
      default: "Pakistan",
    },
    city: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    isStopped: {
      type: Boolean,
      default: true,
    },
    amountNeeded: {
      type: Number,
      required: [true, "Please enter amount needed"],
    },
    amountCollected: {
      type: Number,
      default: 0,
    },
    story: String,
    image: String,
    campaignType: {
      type: String,
      enum: ["Ongoing", "With End Date"],
      default: "Ongoing",
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    noOfDonations: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please enter fundraiser id"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);
