import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req: any, res: any, next: any) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const jwtSecret: any = process.env.JWT_SECRET;
      const decoded: any = jwt.verify(token, jwtSecret);

      req.user = await User.findById(decoded.userId).select('-password');

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

export { protect };
