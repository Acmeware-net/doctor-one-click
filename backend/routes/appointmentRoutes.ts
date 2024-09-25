import express from 'express';
import { protect } from '../middleware/authMiddleware.js';


import {
  createAppointment,
  findAppointment,
  findAppointments,
  updateAppointment,
} from '../controllers/appointmentController.js';

const router = express.Router();

// Appointment routes
router.route('/create').post(protect, createAppointment);
router.route('/get/:id').get(protect, findAppointment);
router.route('/get').get(protect, findAppointments);
router.route('/update').put(protect, updateAppointment);

export default router;
