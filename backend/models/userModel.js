const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please Enter Your Firstname"],
    maxLenght: [30, "Firstname cannot exceed 30 characters"],
  },
  lastname: {
    type: String,
    required: [true, "Please Enter Your Lastname"],
    maxLenght: [30, "Lastname cannot exceed 30 characters"],
  },
  phoneNo: {
    type: Number,
    required: [true, "Please Enter Your Phone Number"],
    maxLenght: [10, "Phone Number cannot exceed 10 digits"],
    minLenght: [10, "Phone Number cannot be less then 10 digits"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your password"],
    minLenght: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
//Password Hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

// Compare Passsword

userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Genrate Password reset Token
userSchema.methods.getResetPasswordToken = function () {
  //Genrating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hasing and adding resetPasswordToken to UserSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
