import { Router } from 'express';
import ProductController from '../controller/product.controller';
import ProductService from '../services/product.service';
import verifyRequiredFields from '../middleware/verifyRequiredFields';

const router = Router();

const service = new ProductService();
const productController = new ProductController(service);

router.post(
  '/', 
  verifyRequiredFields('product'),
  (req, res, next) => productController.create(req, res, next),
);
router.get('/', (req, res, next) => productController.getAll(req, res, next));

export default router;