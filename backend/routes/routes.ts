import express from 'express';

import {
  authDoctor,
  registerDoctor,
  logoutDoctor,
  getDoctorProfile,
  updateDoctorProfile,
} from '../controllers/doctorController.js';
import {
  authPatient,
  registerPatient,
  logoutPatient,
  getPatientProfile,
  updatePatientProfile
} from '../controllers/patientController.js';
import { protect, protectPatient } from '../middleware/authMiddleware.js';

const router = express.Router();
// doctor routes
router.post('/', registerDoctor);
router.post('/auth', authDoctor);
router.post('/logout', logoutDoctor);
router
  .route('/profile')
  .get(protect, getDoctorProfile)
  .put(protect, updateDoctorProfile);

// Patient routes
router.post('/registerpatient', registerPatient);
router.post('/authpatient', authPatient);
router.post('/logoutpatient', logoutPatient);
router
  .route('/profilepatient')
  .get(protectPatient, getPatientProfile)
  .put(protectPatient, updatePatientProfile);
export default router;
