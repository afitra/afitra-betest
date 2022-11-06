const mongoose = require("mongoose");
const { hashPassword } = require("../helpers/bycrypt");
var uniqueValidator = require("mongoose-unique-validator");
const usersSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  accountNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  identityNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
usersSchema.plugin(uniqueValidator);
usersSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await hashPassword(user.password);
  }
});

module.exports = mongoose.model("Users", usersSchema);
