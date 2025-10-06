import express from 'express';
import healthController from '../controllers/healthController.js';
import supabaseController from '../controllers/supabaseController.js';
import jobsController from '../controllers/jobsController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Public routes (no auth required)
router.get('/health', healthController.getHealth);
router.get('/supabase/test', supabaseController.testConnection);

// Protected Jobs routes (auth required)
router.get('/jobs', authenticateUser, jobsController.getAllJobs);
router.get('/jobs/:id', authenticateUser, jobsController.getJobById);
router.post('/jobs', authenticateUser, jobsController.createJob);
router.put('/jobs/:id', authenticateUser, jobsController.updateJob);
router.delete('/jobs/:id', authenticateUser, jobsController.deleteJob);

export default router;
