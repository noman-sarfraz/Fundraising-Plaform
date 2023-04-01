const Admin = require("../models/Admin");
const { StatusCodes } = require("http-status-codes");
const CustomErrors = require("../errors");
const bcrypt = require("bcryptjs");
const createTokenUser = require("../utils/createTokenUser");
const { attachCookiesToResponse } = require("../utils/jwt");

const getAdmin = async (req, res) => {
  const { userId: adminId } = req.user;
  const admin = await Admin.findOne({
    _id: adminId,
  });
  if (!admin) {
    throw new CustomErrors.NotFoundError(
      `No Admin with id: ${adminId}`
    );
  }

  res.status(StatusCodes.OK).json({ admin });
};

const updateAdmin = async (req, res) => {
  const { userId: donorId } = req.user;
  const admin = await Admin.findByIdAndUpdate(
    { _id: donorId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!admin) {
    throw new CustomErrors.NotFoundError(
      `No admin with id: ${donorId}`
    );
  }
  const tokenUser = createTokenUser(donor);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ admin });
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomErrors.BadRequestError("Provide credentials.");
  }
  const admin = await Admin.findById(req.user.userId).exec();
  if (!admin) {
    throw new CustomErrors.UnauthenticatedError("Invalid User!");
  }
  const isPasswordCorrect = await admin.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomErrors.UnauthenticatedError("Wrong Password!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  const newAdmin = await Admin.findByIdAndUpdate(
    { _id: req.user.userId },
    { password: hashedPassword },
    { new: true, runValidators: true }
  );
  if (!newAdmin) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Something went wrong" });
  }
  res.status(StatusCodes.OK).json({ newPassword: newPassword });
};

const deleteAccount = async (req, res) => {
  const admins = await Admin.find({});
  if(admins.length<=1){
    return res.status(StatusCodes.FORBIDDEN).json({success:false, msg:"Platform must have atleast one Admin account"});
  }
  const admin = await Admin.findByIdAndRemove({
    _id: req.user.userId,
  });
  if (!admin) {
    // console.log(req.user)
    throw new CustomErrors.NotFoundError(
      `No such user with id: ${req.user.userId}`
    );
  }
  res.status(StatusCodes.OK).json({ success: true });
};

const createAdmin = async (req, res) => {
  const { role } = req.body;
  
  // create verification token
  const verificationToken = crypto.randomBytes(40).toString("hex");
  req.body.verificationToken = verificationToken;

  let user;
  if (role === "Admin") {
    user = await Admin.create({ ...req.body });
  } else {
    throw new CustomErrors.BadRequestError("Please provide a valid role.");
  }

  // send verification email
  const origin = "front end link";
  await sendVerificationEmail(
    user.name,
    user.email,
    role,
    user.verificationToken,
    origin
  );
 
  res.status(StatusCodes.CREATED).json({ msg: "Verification email sent" });
};

module.exports = {
  getAdmin,
  updateAdmin,
  changePassword,
  deleteAccount,
  createAdmin,
};
