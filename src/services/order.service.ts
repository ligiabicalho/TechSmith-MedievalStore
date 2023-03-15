import OrderModel from '../models/order.model';
import { Order } from '../interfaces';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel();
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.model.getAll();
    return orders;
  }
}

export default OrderService;