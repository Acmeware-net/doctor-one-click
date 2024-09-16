import express from 'express';

import {
  authDoctor,
  registerDoctor,
  logoutDoctor,
  getDoctorProfile,
  updateDoctorProfile,
} from '../controllers/doctorController.js';

import { protect, protectPatient } from '../middleware/authMiddleware.js';

const router = express.Router();
// doctor routes
router.post('/register', registerDoctor);
router.post('/auth', authDoctor);
router.post('/logout', logoutDoctor);
router
  .route('/profile')
  .get(protect, getDoctorProfile)
  .put(protect, updateDoctorProfile);


export default router;
