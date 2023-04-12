import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import StatusCodes from '../statusCode';

export const isRequiredUsername = (req: Request, _res: Response, next: NextFunction) => {
  const { username } = req.body;
  const { error } = Joi.object({
    username: Joi.string().required(),
  }).validate({ username });
  if (error) {
    return next({ 
      statusCode: StatusCodes.BAD_REQUEST, 
      message: '"username" is required' });
  }
  return next();
};

export const isRequiredPassword = (req: Request, _res: Response, next: NextFunction) => {
  const { password } = req.body;
  const { error } = Joi.object({
    password: Joi.string().required(),
  }).validate({ password });
  if (error) {
    return next({ 
      statusCode: StatusCodes.BAD_REQUEST, 
      message: '"password" is required' });
  }
  return next();
}; 