import express from 'express';

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import {
  authPatient,
  registerPatient,
  logoutPatient,
  getPatientProfile,
  updatePatientProfile
} from '../controllers/patientController.js';
import { protect, protectPatient } from '../middleware/authMiddleware.js';

const router = express.Router();
// user routes
router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Patient routes
router.post('/registerpatient', registerPatient);
router.post('/authpatient', authPatient);
router.post('/logoutpatient', logoutPatient);
router
  .route('/profilepatient')
  .get(protectPatient, getPatientProfile)
  .put(protectPatient, updatePatientProfile);
export default router;
