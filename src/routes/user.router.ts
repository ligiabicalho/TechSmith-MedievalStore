import { Router } from 'express';
import UserController from '../controller/user.controller';
import UserService from '../services/user.service';

const router = Router();

const service = new UserService();
const userController = new UserController(service);

router.post('/', (req, res) => userController.create(req, res));

export default router;