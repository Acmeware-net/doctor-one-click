import express from 'express';

import {
  authDoctor,
  getDoctors,
  registerDoctor,
  logoutDoctor,
  getDoctorProfile,
  getDoctorById,
  updateDoctorProfile,
} from '../controllers/doctorController.js';

import { protect, protectPatient } from '../middleware/authMiddleware.js';

const router = express.Router();
// doctor routes
// router.post('/register', registerDoctor);
// router.post('/auth', authDoctor);
// router.post('/logout', logoutDoctor);
// router
//   .route('/profile')
//   .get(protect, getDoctorProfile)
//   .put(protect, updateDoctorProfile);
// router.get('/',getDoctors);
// router.route('/').get(protect, getDoctors);
// router.get('/:id', getDoctorById);

export default router;
