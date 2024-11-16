import mongoose from 'mongoose';

try {
    // Connect
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
} catch (error) {
    // Log error and end Node process if it fails
  console.error('MongoDB connection error:', error);
  process.exit(1);
}