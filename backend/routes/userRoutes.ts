import express from 'express';

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  disableUser,
} from '../controllers/userController.js';

import {
  getDoctorById,
  getDoctorByUserId,
  getDoctors,
} from '../controllers/doctorController.js';

import {
  getPatientById,
  getPatientByUserId,
  getPatients,
} from '../controllers/patientController.js';


import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// User routes
router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, disableUser);

// Doctor routes
router.route('/doctors').get(protect, getDoctors);
router.route('/doctor/:id').get(protect, getDoctorById);
router.route('/doctor/id/:id').get(protect, getDoctorByUserId);

// Patient routes
router.route('/patients').get(protect, getPatients);
router.route('/patient/:id').get(protect, getPatientById);
router.route('/patient/id/:id').get(protect, getPatientByUserId);

// Appointment routes

// Checkup routes


export default router;
