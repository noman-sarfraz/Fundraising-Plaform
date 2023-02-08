const mongoose = require("mongoose");
const bankSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide bank name"],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bank", bankSchema);
