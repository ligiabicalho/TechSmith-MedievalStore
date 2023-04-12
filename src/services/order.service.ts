import OrderModel from '../models/order.model';
import { Order } from '../interfaces';
import ProductModel from '../models/product.model';

class OrderService {
  public orderModel: OrderModel;

  public productModel: ProductModel;

  constructor() {
    this.orderModel = new OrderModel();
    this.productModel = new ProductModel();
  }

  async getAll(): Promise<Order[]> {
    const orders = await this.orderModel.getAll();
    return orders;
  }

  async create(userId: number): Promise<number> {
    const newOrderId = await this.orderModel.create(userId);
    return newOrderId;
  }

  async updateProductsOrder(productsIds: number[], orderId: number): Promise<number[]> {
    await Promise.all(productsIds.map(async (productId: number) => 
      this.productModel.update(productId, orderId)));
    return productsIds;
  }
}

export default OrderService;