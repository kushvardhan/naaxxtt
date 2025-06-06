import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("✅ Using existing DB connection");
    return;
  }

  if (!process.env.MONGODB_URL) {
    throw new Error("❌ MONGODB_URL is not defined");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'NullDeBugged',
    });
    isConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};
