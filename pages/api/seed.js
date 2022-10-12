import connectDB from "../../utils/db";

const handler = async (req,res) => {
    await connectDB();
}