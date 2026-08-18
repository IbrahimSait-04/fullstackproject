const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  license: {
    type: String,
    default: null,
  },
  licenseStatus: {
    type: String,
    enum: ["Not Added", "Pending", "Approved", "Rejected"],
    default: "Not Added",
  },
  ban: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
