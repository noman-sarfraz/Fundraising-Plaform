const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter campaign title"],
      maxlength: 25,
    },
    category: {
      type: String,
      required: [true, "Please enter campaign category"],
      maxlength: 15,
    },
    country: {
      type: String,
      default: "Pakistan",
    },
    city: {
      type: String,
      maxlength: 25,
    },
    endDate: {
      type: Date,
    },
    amountNeeded: {
      type: Number,
      required: [true, "Please enter amount needed"],
    },
    story: String,
    image: String,
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    bankName: {
      type: mongoose.Types.ObjectId,
      ref: "Bank",
      required: [true, "Please enter bank name"],
    },
    bankAccountNo: {
      type: Number,
      required: [true, "Please enter bank account number"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Fundraiser",
      required: [true, "please enter fundraiser id"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);
