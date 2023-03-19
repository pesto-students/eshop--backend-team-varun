 const ErrorHandler = require("../utils/errorhandler");

 module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message ||"Server Internal Error";



    // MongoDB DataBase cast Error  ID  Issue

    if( err.name =="CastError"){ 
        const message = ` Resource not found. Invalid : ${err.path}`;
        err = new ErrorHandler(message,400);
    }; 


    // Mongoose duplicate Key Error
    if(err.code === 11000){
         const message = ` Duplicate ${object.keys(err.keyValue)} Entered`;
         err = new ErrorHandler(message, 400);
    };


    // Wrong JWT Error
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, Try again`
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
 

    });
 } 