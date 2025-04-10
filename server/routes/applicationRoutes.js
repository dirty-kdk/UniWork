import express from 'express';
import {
  getUserApplications,
  createApplication,
  getApplicationById,
  cancelApplication,
} from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Все маршруты защищены, т.к. требуют аутентификации
router
  .route('/')
  .get(protect, getUserApplications)
  .post(protect, createApplication);

router
  .route('/:id')
  .get(protect, getApplicationById)
  .delete(protect, cancelApplication);

export default router; 