import express from 'express';
import { auth } from '../middleware/auth.js';
import { getHeroSlides, createHeroSlide, updateHeroSlide, deleteHeroSlide } from '../controllers/heroSlides.js';

const router = express.Router();

// Public routes
router.get('/', getHeroSlides);

// Protected routes
router.post('/', auth, createHeroSlide);
router.put('/:id', auth, updateHeroSlide);
router.delete('/:id', auth, deleteHeroSlide);

export default router;