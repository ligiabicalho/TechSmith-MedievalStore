import { Request, Response } from 'express';
import statusCodes from '../statusCode';
import ProductService from '../services/product.service';
import 'express-async-errors'; // faz o tratamento de erros disparar diretamente o middleware de erro sem a necessidade de colocar try/catch

class ProductController {
  private productService: ProductService;

  constructor(productService = new ProductService()) { 
    this.productService = productService;
  }

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(statusCodes.OK).json(products);
  };

  public create = async (req: Request, res: Response) => {
    const product = req.body;
    const newProduct = await this.productService.create(product);
    res.status(statusCodes.CREATED).json(newProduct);
  };
}

export default ProductController;