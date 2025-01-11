import express from 'express';
import { auth } from '../middleware/auth.js';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected routes
router.post('/', auth, createProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

export default router;