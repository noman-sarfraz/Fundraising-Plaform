const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const FundraiserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 50,
    },
    lastName: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Provide valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
    },
    aboutMe: {
      type: String,
      maxlength: 500,
    },
    city: {
      type: String,
      maxlength: 50,
    },
    country: {
      type: String,
      maxlength: 50,
    },
    verificationToken:String,
    isVerified:{
      type:Boolean,
      default:false,
    },
    verified:Date,
    passwordToken :{
      type:String,
    },
    passwordTokenExpirationDate:{
      type:Date,
    }
  },
  { timestamps: true }
);

FundraiserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

FundraiserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, role: "Fundraiser" },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

FundraiserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Fundraiser", FundraiserSchema);
