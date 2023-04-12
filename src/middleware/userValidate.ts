import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import StatusCodes from '../statusCode';

const schemaUser = Joi.object({
  username: Joi.string().min(3),
  vocation: Joi.string().min(3),
  level: Joi.number().greater(0),
  password: Joi.string().min(8),
}).messages({
  'number.greater': '"level" must be greater than or equal to 1',
});

const isValidUser = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = schemaUser.validate(req.body);
  if (error) {
    return next({ 
      statusCode: StatusCodes.UNPROCESSABLE, 
      message: error.message });
  }

  next();
};

export default isValidUser;
