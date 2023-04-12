import { Request, Response, NextFunction } from 'express';
import StatusCodes from '../statusCode';

const requestRequiredFields = {
  user: ['username', 'vocation', 'level', 'password'],
  login: ['username', 'password'],
  product: ['name', 'amount'],
  order: ['productsIds'],
};

const verifyRequiredFields = (key: keyof typeof requestRequiredFields) =>
  (req: Request, _res: Response, next: NextFunction): Response | void => {
    const requiredFields = requestRequiredFields[key];
    for (let i = 0; i < requiredFields.length; i += 1) {
      if (!req.body[requiredFields[i]]) {
        return next({
          statusCode: StatusCodes.BAD_REQUEST, 
          message: `"${requiredFields[i]}" is required`, 
        });
      }
    }
    next();
  };

export default verifyRequiredFields;