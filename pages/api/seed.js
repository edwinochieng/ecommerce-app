import Product from "../../models/Product";
import User from "../../models/User";
import { products, users } from "../../utils/data";
import connectDB from "../../utils/db";

const handler = async (req, res) => {
  await connectDB();
  await User.deleteMany();
  await User.insertMany(users);
  await Product.deleteMany();
  await Product.insertMany(products);

  res.send({ success: true });
};

export default handler;
