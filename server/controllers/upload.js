import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Get upload path from request body or use default
    const uploadPath = req.body.uploadPath || 'uploads/images';
    
    // Create absolute path
    const fullPath = join(__dirname, '../../', uploadPath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    
    // Store the uploadPath for later use
    req.uploadPath = uploadPath;
    cb(null, fullPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
}).single('image');

export const uploadImage = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // An unknown error occurred when uploading
      return res.status(500).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      // Get the relative path from the upload directory
      const relativePath = path.relative(
        join(__dirname, '../../'),
        req.file.path
      ).replace(/\\/g, '/');

      // Return the URL path
      res.json({
        url: `/${relativePath}`
      });
    } catch (error) {
      console.error('Error processing upload:', error);
      res.status(500).json({ message: 'Error processing upload' });
    }
  });
}; 