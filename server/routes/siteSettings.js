import express from 'express';
const router = express.Router();
import {
  getSiteSettings,
  updateSiteSetting,
} from '../controllers/siteSettings.js';

router.get('/', getSiteSettings);
router.put('/:key', updateSiteSetting);

export default router;