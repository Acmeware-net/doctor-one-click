import express from 'express';

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import {
  authDoctor,
  registerDoctor,
  logoutDoctor,
  getDoctorProfile,
  updateDoctorProfile
} from '../controllers/doctorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
// user routes
router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Doctor routes
router.post('/registerdoctor', registerDoctor);
router.post('/authdoctor', authDoctor);
router.post('/logoutdoctor', logoutDoctor);
router
  .route('/profiledoctor')
  .get(protect, getDoctorProfile)
  .put(protect, updateDoctorProfile);
export default router;
