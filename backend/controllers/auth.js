const { StatusCodes } = require("http-status-codes");
const Donor = require("../models/Donor");
const Fundraiser = require("../models/Fundraiser");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("./../errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { role } = req.body;
  let user;
  if(role === 'Donor') {
    user = await Donor.create({ ...req.body });
  } else if(role === 'Fundraiser') {
    user = await Fundraiser.create({ ...req.body });
  } else {
    throw new BadRequestError("Please provide a valid role.");
  }
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ token });
};


const login = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    throw new BadRequestError("Please provide email, password and role.");
  }

  let user;
  if(role === 'Donor') {
    user = await Donor.findOne({ email });
  } else if(role === 'Fundraiser') {
    user = await Fundraiser.findOne({ email });
  } else {
    throw new BadRequestError("Please provide a valid role.");
  }

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ token });
};

module.exports = {
  register,
  login,
};
