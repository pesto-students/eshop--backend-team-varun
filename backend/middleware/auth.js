const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");

// exports.verifyToken = catchAsyncError(async (req, res, next) => {
//   const { token } = req.cookies;

//   if (!token) {
//     return next(new ErrorHandler("Please Login to Access  this resource", 401));
//   }
//   const decodeData = jwt.verify(token, process.env.JWT_SECRET);

//   req.user = await User.findById(decodeData.id);
//   next();
// });

//Authorize Rols

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role : ${req.user.role} is not allowed to access this resource `,
          403
        )
      );
    }
    next();
  };
};

exports.verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    req.token = bearerToken;
    const decodeData = jwt.verify(bearerToken, process.env.JWT_SECRET);

    req.user = await User.findById(decodeData.id);
    next();
  } else {
    res.sendStatus(403);
  }
};
