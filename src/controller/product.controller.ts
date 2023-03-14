import { Request, Response } from 'express';
import statusCodes from '../statusCode';
import ProductService from '../services/products.service';
import 'express-async-errors'; // faz o tratamento de erros disparar diretamente o middleware de erro sem a necessidade de colocar try/catch

class BooksController {
  constructor(private productService = new ProductService()) { }

  public create = async (req: Request, res: Response) => {
    const product = req.body;
    const newProduct = await this.productService.create(product);
    res.status(statusCodes.CREATED).json(newProduct);
  };
}

export default BooksController;