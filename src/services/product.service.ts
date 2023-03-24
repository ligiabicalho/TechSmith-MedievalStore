import ProductModel from '../models/product.model';
import { Product } from '../interfaces';

class ProductService {
  // declarando a propriedade model, com tipo da class ProductModel;
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel();
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.model.getAll();
    return products;
  }

  public async create(product: Product): Promise<Product> {
    const newProduct = await this.model.create(product);
    return newProduct;
  }
}

export default ProductService;