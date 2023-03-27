import { Router } from 'express';
import LoginController from '../controller/login.controller';

const router = Router();

const loginController = new LoginController();

// callback para manter o contexto do this do Controller.
router.post('/', (req, res, next) => loginController.login(req, res, next));

export default router;