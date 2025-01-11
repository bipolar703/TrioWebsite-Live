import express from 'express';
import { auth } from '../middleware/auth.js';
import { upload, deleteFile } from '../config/upload.js';

const router = express.Router();

// Upload single file
router.post('/:type', auth, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Return the file path that can be stored in the database
    const filePath = req.file.path.replace(/\\/g, '/'); // Convert Windows path to URL format
    res.json({
      path: filePath,
      url: `${process.env.API_URL}/${filePath}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
});

// Delete file
router.delete('/', auth, (req, res) => {
  try {
    const { path } = req.body;
    if (!path) {
      return res.status(400).json({ message: 'File path is required' });
    }

    deleteFile(path);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error deleting file' });
  }
});

export default router; 