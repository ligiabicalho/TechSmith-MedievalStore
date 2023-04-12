import { Router } from 'express';
import UserController from '../controller/user.controller';
import verifyRequiredFields from '../middleware/verifyRequiredFields';
import UserService from '../services/user.service';

const router = Router();

const service = new UserService();
const userController = new UserController(service);

// se não usar callback, controller deve usar arrow functions nos métodos.
router.post(
  '/', 
  verifyRequiredFields('user'),
  (req, res, next) => userController.create(req, res, next),
);

export default router;