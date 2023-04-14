const app = require("./app");

const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;

const connectDatabase = require("./config/database");

//handling Uncaught Exceptions Errors
process.on("uncaughtException", (err) => {
  console.log(` Error : ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exceptions`);

  server.close(() => {
    process.exit(1);
  });
});

//config
dotenv.config({ path: "backend/config/config.env" });

//connecting  to DataBase
connectDatabase();

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Sever is working   on http: //localhost ${process.env.PORT} `);
});

//Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Unhandled Promise Rejections Errors
process.on("unhandledRejection", (err) => {
  console.log(` Error : ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise Resjections`);

  server.close(() => {
    process.exit(1);
  });
});
