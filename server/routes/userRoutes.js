import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Маршруты для аутентификации
router.post('/register', registerUser);
router.post('/login', loginUser);

// Маршруты для профиля (защищенные)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, upload.single('resume'), updateUserProfile);

export default router; 