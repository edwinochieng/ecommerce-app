import Product from "../../../models/Product";
import { connectDB } from "../../../utils/db";

const handler = async (req, res) => {
  await connectDB();
  const product = await Product.findById(req.query.id);
  res.send(product);
};

export default handler;
