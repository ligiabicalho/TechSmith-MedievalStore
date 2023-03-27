import { NextFunction, Request, Response } from 'express';
import statusCodes from '../statusCode';
import OrderService from '../services/order.service';
import 'express-async-errors';

class OrderController {
  constructor(
    private orderService = new OrderService(),
  ) { }

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orders = await this.orderService.getAll();
      res.status(statusCodes.OK).json(orders);
    } catch (error) {
      next(error);
    }
  }
}

export default OrderController;