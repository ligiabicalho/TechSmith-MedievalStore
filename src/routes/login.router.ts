import { Router } from 'express';
import LoginController from '../controller/login.controller';

const router = Router();

const loginController = new LoginController();

router.post('/', loginController.login);

export default router;