import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("connected to DB");
};

export const convertDocToObj = (doc) => {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();

  return doc;
};
