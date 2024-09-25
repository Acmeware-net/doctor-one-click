import express from 'express';
import { protect } from '../middleware/authMiddleware.js';


import {
  createCheckup,
  findCheckup,
  findCheckups,
  updateCheckup,
} from '../controllers/checkupController.js';


const router = express.Router();


// Checkup routes
router.route('/create').post(protect, createCheckup);
router.route('/get/:id').get(protect, findCheckup);
router.route('/get').get(protect, findCheckups);
router.route('/update').put(protect, updateCheckup);


export default router;
