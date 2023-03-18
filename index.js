import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/connectDB.js";
import productRoute from "./route/productRoute.js";
import userRoute from "./route/userRoute.js";

const app = express();

// Config
dotenv.config({ path: "./config/config.env" });

//middlewares
// app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/ecom/admin/products", productRoute);
app.use("/ecom/admin/user", userRoute);

// Error Handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, async () => {
  // connect to mongoDB
  await connectDB();
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});
