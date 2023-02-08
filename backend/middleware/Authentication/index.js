const admin = require("./adminAuthentication");
const fundraiser = require("./fundraiserAuthentication");
const donor = require("./donorAuthentication");
const user = require("./userAuthentication");

module.exports = {
  admin,
  fundraiser,
  donor,
  user,
};
