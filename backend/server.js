const app = require("./app");

const dotenv =require("dotenv");

const connectDatabase =require("./config/database");





//config
 dotenv.config({path:"backend/config/config.env"});

 //connecting  to DataBase
 connectDatabase();

 const server = app.listen(process.env.PORT,()=>{
    console.log(`Sever is working   on http: //localhost ${process.env.PORT} `);
 });




 

