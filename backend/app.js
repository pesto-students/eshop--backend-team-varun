const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error")


app.use(express.json());


//Routes Imports

const product = require("./routes/productRoute");

 //Middleware for Error

 app.use(errorMiddleware);

app.use("/api/v1",product);





 module.exports = app;