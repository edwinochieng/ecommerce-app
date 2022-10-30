import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/ecommerce");
  console.log("connected to DB");
};

export default connectDB;
