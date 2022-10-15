import User from "../../models/User";
import { users } from "../../utils/data";
import connectDB from "../../utils/db";

const handler = async (req,res) => {
    await connectDB();
    await User.deleteMany();
    await User.insertMany(users)
    res.send({success:true})
}

export default handler;