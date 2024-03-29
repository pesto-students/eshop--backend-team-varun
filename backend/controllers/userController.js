const ErrorHandler = require("../utils/errorHandler");

const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtTokens");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const receiveEmail = require("../utils/receiveEmail");

//Reister a User

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { firstname, lastname, phoneNo, email, password } = req.body;

  const user = await User.create({
    firstname,
    lastname,
    phoneNo,
    email,
    password,
  });

  sendToken(user, 201, res);
});

// User Login

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout User

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forget Password

exports.forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler(`User Not Found`, 404));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  // const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`;

  // const message = `Your password reset token is :-\n\n ${resetPasswordUrl} \n\n if you have not requeseted this email then, please ignore it `;

  const message = `\n 
      Eshop  Online Shopping Platfrom
          
      Password Reset Link is :- ${resetPasswordUrl} \n

      If you didn't request this link, you can safely ignore this email. Someone else might have typed your email address by mistake
      \n
      Thanks\n 
      The Eshop team`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Eshop  Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} Successfully`,
    });
  } catch (error) {
    user.getResetPasswordToken = undefined;
    user.getResetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // creating Hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        `Reset Password Token is invalid or Has been Expired`,
        400
      )
    );
  }

  if (req.body.passwords.password !== req.body.passwords.confirmPassword) {
    return next(new ErrorHandler(`Password Doesn't  Match`, 400));
  }

  user.password = req.body.passwords.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//Get User Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldpassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  user.password = req.body.newPassword;

  await user.save();
  sendToken(user, 200, res);
});

// Update  User  Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

// get All users
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// get Single User Details (Admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User Does not exits with Id : ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update  User   Role or Profile -- admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Contact Admin
exports.mailToAdmin = catchAsyncError(async (req, res, next) => {
  await receiveEmail(
    {
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    },
    (error, info) => {
      if (error) {
        res.send(error);
      } else {
        console.log("Email sent :" + info.response);
        res.send("success");
      }
    }
  );

  res.status(200).json({
    success: true,
  });
});

// Delete User -- Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id : ${req.params.id}`)
    );
  }

  await user.remove();
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
