const express = require("express");
const { registerUser, 
    loginUser, 
    logout, 
    forgetPassword, 
    resetPassword, 
    getUserDetails, 
    updatePassword,
    updateProfile,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser} = require("../controllers/userController");

    const {verifyToken, authorizeRoles}= require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(verifyToken, getUserDetails);

router.route("/logout").get(logout);

router.route("/me/update").put(verifyToken, updateProfile);

router.route("password/update").put(verifyToken, updatePassword);

router.route("/admin/users").get(verifyToken, authorizeRoles("admin"), getAllUser);

router.route("/admin/user/:id").get(verifyToken, authorizeRoles("admin"), getSingleUser)
.put(verifyToken, authorizeRoles("admin"),updateUserRole)
.delete(verifyToken, authorizeRoles("admin"), deleteUser);





module.exports = router;  