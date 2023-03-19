const Product= require("../models/productModell");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");



//Reister a User

exports. registerUser = catchAsyncError(async (req, res, next)=>{
    const { name, email, password} = req.body;
    const user = await User.create({
       name,
       email,
       password,
       avatar:{ 
           public_Id:"Sample Id",
           url:"smapleurl",
       },

    });

  sendToken(user,201,res);
});


// User Login

exports.loginUser = catchAsyncError(async (req, res,next)=>{
    const {email, password}= req.body;

// Checking User has given  Email and Pasword both 

if(!email || !password){
   return next(new ErrorHandler("Please Enter Email and Password", 400));
};

const user = await User.findOne({ email }).select("+password");

if(!user){
   return next(new ErrorHandler("Invalid email or password", 401));
};

const isPasswordMatched = await user.comparePassword(password);
if(!isPasswordMatched){
   return next(new ErrorHandler("Invalid email or password", 401));
};

sendToken(user,200,res);

});


// Logout User

exports.logout = catchAsyncError(async (req, res, next)=>{

    res.cookie("token", null, {
       expires: new Date(Date.now()),
       httpOnly: true,
    });
 
    res.status(200).json({
       success:true,
       message: "Logged Out",
    });
 });
 
