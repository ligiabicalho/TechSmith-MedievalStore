import ProductModel from '../models/product.model';
import { Product, ProductCreateReq, ProductCreateRes } from '../interfaces';

class ProductService {
  // declarando a propriedade model, com tipo da class ProductModel;
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel();
  }

  async getAll(): Promise<Product[]> {
    const products = await this.model.getAll();
    return products;
  }

  async create(product: ProductCreateReq): Promise<ProductCreateRes> {
    const newProduct = await this.model.create(product);
    return newProduct;
  }
}

export default ProductService;