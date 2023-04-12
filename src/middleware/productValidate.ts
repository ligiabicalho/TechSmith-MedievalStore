import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import StatusCodes from '../statusCode';

const schemaProductsIds = Joi.object({
  productsIds: Joi.array(),
});

const schemaProductsIdsArrNum = Joi.object({
  productsIds: Joi.array().items(Joi.number().required()),
});

export const isRequiredProductsIds = (req: Request, _res: Response, next: NextFunction) => {
  const { productsIds } = req.body;
  const { error } = Joi.object({
    productsIds: Joi.required() }).required().validate({ productsIds });
  if (error) {
    return next({ 
      statusCode: StatusCodes.BAD_REQUEST, 
      message: '"productsIds" is required' });
  }
  return next();
};

export const isValidProdcutsIds = (req: Request, _res: Response, next: NextFunction) => {
  const { productsIds } = req.body;
  const isArray = schemaProductsIds.validate({ productsIds });
  if (isArray.error) {
    return next({ 
      statusCode: StatusCodes.UNPROCESSABLE, 
      message: '"productsIds" must be an array' });
  }
  const isArrNumber = schemaProductsIdsArrNum.validate({ productsIds });
  if (isArrNumber.error) {
    return next({ 
      statusCode: StatusCodes.UNPROCESSABLE, 
      message: '"productsIds" must include only numbers' });
  }

  next();
};
