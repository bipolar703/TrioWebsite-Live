import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement
} from '../controllers/achievements.js';

const router = express.Router();

// Public routes
router.get('/', getAchievements);

// Protected routes
router.post('/', auth, createAchievement);
router.put('/:id', auth, updateAchievement);
router.delete('/:id', auth, deleteAchievement);

export default router;