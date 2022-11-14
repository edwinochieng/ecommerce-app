import { getSession } from "next-auth/react";
import Order from "../../../../models/Order";
import { connectDB } from "../../../../utils/db";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).send("Signin is required");
  }

  await connectDB();
  const order = await Order.findById(req.query.id);
  res.send(order);
};

export default handler;
