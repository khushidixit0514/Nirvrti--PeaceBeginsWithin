import express from 'express';
import {
  createEntry,
  getEntries,
  deleteEntry,
} from '../controllers/writingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createEntry)
  .get(protect, getEntries);

router.delete('/:id', protect, deleteEntry);

export default router;
