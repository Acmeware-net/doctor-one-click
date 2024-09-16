import express from 'express';


import {
  createAppointment,
  findAppointment,
  updateAppointment,
} from '../controllers/appointmentController.js';

const router = express.Router();

// Appointment routes
router.post('/create', createAppointment);
router.get('/get', findAppointment);
router.post('/update', updateAppointment);

export default router;
