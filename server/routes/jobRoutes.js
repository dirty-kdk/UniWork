import express from 'express';
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Маршруты для доступа ко всем вакансиям и созданию новой вакансии
router
  .route('/')
  .get(getJobs)
  .post(protect, createJob); // В будущем можно добавить middleware для проверки роли админа

// Маршруты для доступа к конкретной вакансии
router
  .route('/:id')
  .get(getJobById)
  .put(protect, updateJob) // В будущем можно добавить middleware для проверки роли админа
  .delete(protect, deleteJob); // В будущем можно добавить middleware для проверки роли админа

export default router; 