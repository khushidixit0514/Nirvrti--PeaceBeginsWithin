// 



import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors'; // ✅ Import CORS

// Import routes
import authRoutes from './routes/authRoutes.js';
import writingRoutes from './routes/writingRoutes.js';
import capsuleRoutes from './routes/capsuleRoutes.js';
import userRoutes from './routes/userRoutes.js';
import storyRoutes from './routes/storyRoutes.js';

// Import middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

// ✅ CORS setup
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // allow React frontend
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/writing', writingRoutes);
app.use('/api/capsule', capsuleRoutes);
app.use('/api/user', userRoutes);
app.use('/api/stories', storyRoutes);

// Error handling middleware (after routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
