import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) {
    console.error('❌ MONGODB_URL not found in environment variables');
    return;
  }

  if (isConnected) {
    console.log('✅ Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'NullDeBugged',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any); // TypeScript workaround if it complains
    isConnected = true;
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error; // important for debugging in calling functions
  }
};
