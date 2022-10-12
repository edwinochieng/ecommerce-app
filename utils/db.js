import mongoose from 'mongoose';

const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/ecommerce')
    console.log('connected')
}

export default connectDB