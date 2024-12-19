import express from 'express';
import { auth } from '../middleware/auth.js';
import { uploadImage } from '../controllers/upload.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'public', req.body.uploadPath || 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Protected routes
router.post('/image', auth, upload.single('image'), uploadImage);

export default router; 