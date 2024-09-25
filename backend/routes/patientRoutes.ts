import express from 'express';


import {
  authPatient,
  registerPatient,
  logoutPatient,
  getPatientProfile,
  updatePatientProfile,
  getPatients,
} from '../controllers/patientController.js';

import { protect, protectPatient } from '../middleware/authMiddleware.js';

const router = express.Router();


// Patient routes
// router.post('/register', registerPatient);
// router.post('/auth', authPatient);
// router.post('/logout', logoutPatient);
// router
//   .route('/profile')
//   .get(protectPatient, getPatientProfile)
//   .put(protectPatient, updatePatientProfile);
//   router.route('/').get(protect, getPatients);

export default router;
