import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri: any = process.env.MONGO_URI;
  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
