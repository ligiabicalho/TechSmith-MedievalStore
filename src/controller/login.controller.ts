import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import 'express-async-errors';
import generateToken from '../auth/generateToken';
import statusCodes from '../statusCode';
import { Payload, UserLogin } from '../interfaces';

class LoginController {
  constructor( 
    private userService = new UserService(),
  ) { }

  // em classe não devemos usar arrow function, com arrow function o this referencia quem chamou (Controller), não a arrow funtion/método.
  // com método funcional, devemos usar callback no router;
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userLogin: UserLogin = req.body;
      const { error, message, user } = await this.userService.getByUsername(userLogin);
      if (error) res.status(error).json({ message });
      
      const payload: Payload = { id: user.id, username: userLogin.username };
      const token: string = generateToken(payload);
      res.status(statusCodes.OK).json({ token });
    } catch (error) {
      next(error);
    }
  }
}

export default LoginController;