import { Router } from 'express';
import OrderController from '../controller/order.controller';
import OrderService from '../services/order.service';

const router = Router();

// const repository = new OrderRepository();
// repository: se fizer contato com bd separado da Model.
const service = new OrderService();
const orderController = new OrderController(service);

router.get('/', (req, res) => orderController.getAll(req, res));

export default router;