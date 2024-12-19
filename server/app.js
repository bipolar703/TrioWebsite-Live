import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import authRoutes from './routes/auth.js';
import achievementsRoutes from './routes/achievements.js';
import clientLogosRoutes from './routes/clientLogos.js';
import heroSlidesRoutes from './routes/heroSlides.js';
import uploadRoutes from './routes/upload.js';
import productsRoutes from './routes/products.js';
import productCategoriesRoutes from './routes/productCategories.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/client-logos', clientLogosRoutes);
app.use('/api/hero-slides', heroSlidesRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/product-categories', productCategoriesRoutes);

// Serve static files from the public directory
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app; 