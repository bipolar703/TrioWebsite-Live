import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getClientLogos,
  createClientLogo,
  updateClientLogo,
  deleteClientLogo
} from '../controllers/clientLogos.js';

const router = express.Router();

// Public routes
router.get('/', getClientLogos);

// Protected routes
router.post('/', auth, createClientLogo);
router.put('/:id', auth, updateClientLogo);
router.delete('/:id', auth, deleteClientLogo);

export default router;