import { NextFunction, Request, Response } from 'express';
import statusCodes from '../statusCode';
import ProductService from '../services/product.service';
import 'express-async-errors'; // faz o tratamento de erros disparar diretamente o middleware de erro sem a necessidade de colocar try/catch

class ProductController {
  constructor(
    private productService = new ProductService(),
  ) { }

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await this.productService.getAll();
      res.status(statusCodes.OK).json(products);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = req.body;
      const newProduct = await this.productService.create(product);
      res.status(statusCodes.CREATED).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;