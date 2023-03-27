import { Router } from 'express';
import ProductController from '../controller/product.controller';
import ProductService from '../services/product.service';

const router = Router();

const service = new ProductService();
const productController = new ProductController(service);

router.post('/', (req, res) => productController.create(req, res));
router.get('/', (req, res) => productController.getAll(req, res));

export default router;