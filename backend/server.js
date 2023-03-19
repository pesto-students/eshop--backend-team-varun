const app = require("./app");

const dotenv =require("dotenv");

const connectDatabase =require("./config/database");


//handling Uncaught Exceptions Errors
process.on("uncaughtException",(err)=>{
   console.log(` Error : ${err.message}`);
   console.log(`Shutting down the server due to Uncaught Exceptions`);

 server.close(()=>{
   process.exit(1);
 });
});


//config
 dotenv.config({path:"backend/config/config.env"});

 //connecting  to DataBase
 connectDatabase();

 const server = app.listen(process.env.PORT,()=>{
    console.log(`Sever is working   on http: //localhost ${process.env.PORT} `);
 });




 // Unhandled Promise Rejections Errors

process.on("unhandledRejection",(err)=>{
   console.log(` Error : ${err.message}`);
   console.log(`Shutting down the server due to unhandled promise Resjections`);

 server.close(()=>{
   process.exit(1);
 });
});

