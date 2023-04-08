const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const DonorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
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

DonorSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

DonorSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Donor", DonorSchema);
