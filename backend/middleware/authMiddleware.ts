import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Doctor from '../models/doctorModel.js';
import Patient from '../models/patientModel.js';

const protect = asyncHandler(async (req: any, res: any, next: any) => {
  let token;
  console.log(`Inside auth middleware`);
  token = req.cookies.jwt;
  console.log(`token : ${token}`);
  if (token) {
    try {
      const jwtSecret: any = process.env.JWT_SECRET;
      const decoded: any = jwt.verify(token, jwtSecret);
      const doctorId: any = decoded.doctorId;
      console.log(`decoded token: ${decoded}`);
      req.doctor = await Doctor.findById(doctorId).select('-password');
      console.log(`request doctor is ${req.doctor}`);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});



const protectPatient = asyncHandler(async (req: any, res: any, next: any) => {
  let token;

  token = req.cookies.jwt;
console.log(`token : ${token}`);
  if (token) {
    try {
      const jwtSecret: any = process.env.JWT_SECRET;
      const decoded: any = jwt.verify(token, jwtSecret);
      const doctorId: any = decoded.doctorId;
      console.log(`decoded token: ${decoded}`);
      req.doctor = await Patient.findById(doctorId).select('-password');
      console.log(`requested doctor is ${req.doctor}`);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect, protectPatient };
