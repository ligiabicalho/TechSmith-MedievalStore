import { Router } from 'express';
import ProductController from '../controller/product.controller';

const router = Router();

const productController = new ProductController();

router.post('/', productController.create);

export default router;