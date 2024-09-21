import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Doctor from '../models/doctorModel.js';
import User from '../models/userModel.js';
import Patient from '../models/patientModel.js';

const protect = asyncHandler(async (req: any, res: any, next: any) => {
  let token;
  console.log(`Entering protect method inside auth middleware`);
  token = req.cookies.jwt;
  console.log(`token : ${token}`);
  if (token) {
    try {
      const jwtSecret: any = process.env.JWT_SECRET;
      const decoded: any = jwt.verify(token, jwtSecret);
      console.log(`decoded token : ${decoded}`)
      const userId: any = decoded.userId;
      console.log(`user id: ${userId}`);
      req.user = await User.findById(userId).select('-password');
      console.log(`request user is ${req.user}`);
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
  
  if (token) {
    try {
      const jwtSecret: any = process.env.JWT_SECRET;
      const decoded: any = jwt.verify(token, jwtSecret);
      const userId: any = decoded.userId;
      req.user = await User.findById(userId).select('-password');
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
