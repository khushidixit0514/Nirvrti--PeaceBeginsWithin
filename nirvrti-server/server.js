import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import writingRoutes from './routes/writingRoutes.js';
import capsuleRoutes from './routes/capsuleRoutes.js';
import userRoutes from './routes/userRoutes.js';
import storyRoutes from './routes/storyRoutes.js'

// Import middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// If you use EJS or any template engine, setup here (optional)
// app.set('view engine', 'ejs');
// app.set('views', './views');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/writing', writingRoutes);
app.use('/api/capsule', capsuleRoutes);
app.use('/api/user', userRoutes);
app.use("/api/stories", storyRoutes);

// Error handling middleware (should be after routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
