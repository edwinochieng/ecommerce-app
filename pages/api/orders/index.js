import { getSession } from "next-auth/react";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send("Signin is required");
  }

  const { user } = session;

  const newOrder = new Order({
    ...req.body,
    user: user.email,
  });

  const order = await newOrder.save();

  res.status(201).send(order);
};

export default handler;
