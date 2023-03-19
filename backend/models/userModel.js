const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

 const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required:[true, "Please Enter Your Name"],
        maxLenght:[30, "Name cannot exceed 30 characters"],
        
    },
    email:{
        type:String,
        required:[true, "Please Enter your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your password"],
        minLenght:[8 , "Password should be greater than 8 characters"],
        select: true
    },
    avatar:{
        public_Id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role: {
        type: String,
        default: "user",
    },

    resetPasswordToken: String,
    resetPasswordExpire:Date,

 });
//Password Hashing
userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token

userSchema.methods.getJWTToken = function (){
    return jwt.sign({id : this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });

}; 


// Compare Passsword

userSchema.methods.comparePassword =  async function (enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
};


// Genrate Password reset Token
userSchema.methods.getResetPasswordToken = function(){
    //Genrating token
    const resetToken = crypto.randomBytes(20).toString("hex");
    
    //hasing and adding resetPasswordToken to UserSchema
    this.resetPasswordToken = crypto
                                .createHash("sha256")
                                .update(resetToken)
                                .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 *60 * 1000;

  return resetToken;
}


 module.exports =mongoose.model("User",userSchema);    