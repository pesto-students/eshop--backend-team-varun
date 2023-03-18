import express from "express";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
const router = express.Router();

// Register a User
router.post("/register", registerUser);

// LogIn User
router.post("/logIn", loginUser);

// LogOut User
router.get("/logOut", logoutUser);

// Forgot Password
router.post("/forgotPassword", forgotPassword);

export default router;
