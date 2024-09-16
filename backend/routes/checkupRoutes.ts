import express from 'express';


import {
  createCheckup,
  findCheckup,
  updateCheckup,
} from '../controllers/checkupController.js';


const router = express.Router();


// Checkup routes
router.post('/create', createCheckup);
router.get('/get', findCheckup);
router.post('/update', updateCheckup);


export default router;
