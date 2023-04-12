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

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { productsIds, user } = req.body;
      const orderId = await this.orderService.create(user.id);
      const upProductsOrder = await this.orderService.updateProductsOrder(productsIds, orderId);
      const newOrder = { 
        userId: user.id, 
        productsIds: upProductsOrder, 
      };
      res.status(statusCodes.CREATED).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
}

export default OrderController;