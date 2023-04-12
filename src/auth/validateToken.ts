import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';
import { Decoded } from '../interfaces';
import StatusCodes from '../statusCode';

dotenv.config();
const secret = process.env.JWT_SECRET || 'secret';
const userService = new UserService();

async function validateToken(req: Request, _res: Response, next: NextFunction) {
  const token = req.header('authorization');
  if (!token) {
    return next({
      statusCode: StatusCodes.UNAUTHORIZED, message: 'Token not found',
    });
  }
  try {
    const decoded: Decoded = jwt.verify(token, secret) as Decoded;
    const { user } = await userService.getById(decoded.id);
    if (!user) {
      return next({ statusCode: StatusCodes.UNAUTHORIZED, message: 'Invalid user token' });
    } req.body.user = user;
    next();
  } catch (err) {
    return next({ statusCode: StatusCodes.UNAUTHORIZED, message: 'Invalid token' });
  }
}

export default validateToken;