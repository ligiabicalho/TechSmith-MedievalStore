import { Router } from 'express';
import LoginController from '../controller/login.controller';
import verifyRequiredFields from '../middleware/verifyRequiredFields';

const router = Router();

const loginController = new LoginController();

// callback para manter o contexto do this do Controller.
router.post(
  '/', 
  verifyRequiredFields('login'), 
  (req, res, next) => loginController.login(req, res, next),
);

export default router;