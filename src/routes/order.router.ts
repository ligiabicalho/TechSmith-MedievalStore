import { Router } from 'express';
import OrderController from '../controller/order.controller';
import OrderService from '../services/order.service';
import validateToken from '../auth/validateToken';
import { isRequiredProductsIds, isValidProdcutsIds } from '../middleware/productValidate';

const router = Router();

// const repository = new OrderRepository();
// repository: se fizer contato com bd separado da Model.
const service = new OrderService();
const orderController = new OrderController(service);

router.get('/', (req, res, next) => orderController.getAll(req, res, next));
router.post(
  '/', 
  validateToken,
  isRequiredProductsIds,
  isValidProdcutsIds,
  (req, res, next) => orderController.create(req, res, next),
);

export default router;