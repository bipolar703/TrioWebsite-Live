import express from 'express';
import { auth } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', (req, res) => {
  const { password } = req.body;

  if (password === process.env.VITE_ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid password' });
  }
});

router.get('/verify', auth, (req, res) => {
  res.json({ message: 'Token is valid', user: req.user });
});

export default router; 