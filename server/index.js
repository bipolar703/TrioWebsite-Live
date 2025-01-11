import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import achievementRoutes from './routes/achievements.js';
import heroSlideRoutes from './routes/heroSlides.js';
import clientLogoRoutes from './routes/clientLogos.js';
import productCategoryRoutes from './routes/productCategories.js';
import productRoutes from './routes/products.js';
import siteSettingsRoutes from './routes/siteSettings.js';
import uploadRoutes from './routes/upload.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = join(__dirname, '../uploads');
const heroSlidesDir = join(uploadsDir, 'images/hero-slides');
const achievementsDir = join(uploadsDir, 'images/achievements');
const clientLogosDir = join(uploadsDir, 'images/client-logos');
const productsDir = join(uploadsDir, 'images/products');

[uploadsDir, heroSlidesDir, achievementsDir, clientLogosDir, productsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/hero-slides', heroSlideRoutes);
app.use('/api/client-logos', clientLogoRoutes);
app.use('/api/product-categories', productCategoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/site-settings', siteSettingsRoutes);
app.use('/api/upload', uploadRoutes);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});