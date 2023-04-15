 const mongoose =require("mongoose");

  mongoose.set("strictQuery", true);
 const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI).then(  (data)=>{
      console.log(` Mongo DB connected with server ${data.connection.host}`);
    })
   .catch( (err)=>{console.log(err)})
 }


 module.exports =connectDatabase;