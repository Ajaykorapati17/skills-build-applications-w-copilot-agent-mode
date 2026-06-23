import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ MongoDB connected successfully');
  } catch (error) {
    console.error('✗ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'OctoFit Tracker Backend is running' });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`\n🚀 OctoFit Tracker Backend running at http://localhost:${PORT}`);
      console.log(`📊 MongoDB: ${MONGODB_URI}`);
      console.log(`ℹ️  Environment: ${process.env.NODE_ENV}\n`);
    });
  } catch (error) {
    console.error('✗ Server startup error:', error);
    process.exit(1);
  }
};

startServer();
