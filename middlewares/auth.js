import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    const err = new Error();
    err.status = 401;
    err.message = "Please Login to access this resource";
    return next(err);
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);

  next();
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const err = new Error();
      err.status = 403;
      err.message = `Role: ${req.user.role} is not allowed to access this resouce`;
      return next(err);
    }

    next();
  };
};
