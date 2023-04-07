const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter campaign title"],
      maxlength: 50,
    },
    category: {
      type: String,
      required: [true, "Please enter campaign category"],
      maxlength: 30,
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
    // bankName: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Bank",
    //   required: [true, "Please enter bank name"],
    // },
    // bankAccountNo: {
    //   type: Number,
    //   required: [true, "Please enter bank account number"],
    //   validate: {
    //     validator: function (val) {
    //       return val.toString().length === 16;
    //     },
    //     message: (val) => `${val.value} has to be 16 digits`,
    //   },
    // },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Fundraiser",
      required: [true, "please enter fundraiser id"],
    },  
    organizerName: {
      type: String,
      required: [true, "please enter fundraiser name"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);
