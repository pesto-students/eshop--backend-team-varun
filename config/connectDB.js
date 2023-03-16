import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then((data) => { 
      //   console.log(`MongoDB connected to the server ${data.connection.host}`);
      console.log(`MongoDB connected to the server`);
    })
    .catch((error) => {
      throw error;
    });
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
  console.log("Trying to reconnect.....");
  connectDB();
});
