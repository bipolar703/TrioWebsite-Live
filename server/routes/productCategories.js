import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getProductCategories,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
} from '../controllers/productCategories.js';

const router = express.Router();

// Public routes
router.get('/', getProductCategories);

// Protected routes
router.post('/', auth, createProductCategory);
router.put('/:id', auth, updateProductCategory);
router.delete('/:id', auth, deleteProductCategory);

export default router;