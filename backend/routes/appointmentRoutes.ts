import express from 'express';
import { protect } from '../middleware/authMiddleware.js';


import {
  createAppointment,
  findAppointment,
  findAppointmentsByDoctor,
  findAppointmentsByPatient,
  updateAppointment,
} from '../controllers/appointmentController.js';

const router = express.Router();

// Appointment routes
if (process.env.NODE_ENV === 'production') {
  router.route('/create').post(protect, createAppointment);
  router.route('/get/:id').get(protect, findAppointment);
  // router.route('/get').get(protect, findAppointments);
  router.route('/update').put(protect, updateAppointment);
}else{
  router.get('/create', createAppointment);
  // router.get('/get', findAppointments);
  router.get('/get/:id', findAppointment);
  router.get('/doctor/:id', findAppointmentsByDoctor);
  router.get('/patient/:id', findAppointmentsByPatient);
  router.put('/update', updateAppointment);
}

export default router;
