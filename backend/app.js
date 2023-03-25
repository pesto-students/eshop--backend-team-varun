 const express = require("express");
  const app = express();
  const cookieParser = require("cookie-parser");

  const errorMiddleware = require("./middleware/error");
  const dotenv = require("dotenv");

  //config
 dotenv.config({path:"backend/config/config.env"});

  app.use(express.json());
  
  app.use(cookieParser());

  //Routes Imports

  const product = require("./routes/productRoute");
  const user = require("./routes/userRoute");
  const order = require("./routes/orderRoute");
  const payment = require("./routes/paymentRoutes");

  app.use("/api/v1",product);
  app.use("/api/v1",user);
  app.use("/api/v1/",order);
  app.use("/api/v1/",payment);

  //Middleware for Error

  app.use(errorMiddleware);

   module.exports = app;