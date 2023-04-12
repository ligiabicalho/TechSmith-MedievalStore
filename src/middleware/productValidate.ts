import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import StatusCodes from '../statusCode';

const schemaProductsIds = Joi.object({
  productsIds: Joi.array().items(Joi.number()).min(1)
    .required()
    .messages({
      'array.min': '"productsIds" must include only numbers',
    }),
});

const schemaProduct = Joi.object({
  name: Joi.string().min(3),
  amount: Joi.string().min(3),
});

const isValidProdcutsIds = (req: Request, _res: Response, next: NextFunction) => {
  const { productsIds } = req.body;
  const { error } = schemaProductsIds.validate({ productsIds });
  if (error) {
    return next({ 
      statusCode: StatusCodes.UNPROCESSABLE,  
      message: error.message,
    });
  } next();
};

const isValidProdcut = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = schemaProduct.validate(req.body);
  if (error) {
    return next({ 
      statusCode: StatusCodes.UNPROCESSABLE, 
      message: error.message });
  }

  next();
};

export { isValidProdcutsIds, isValidProdcut };
