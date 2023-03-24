import { Request, Response } from 'express';
import UserService from '../services/user.service';
import 'express-async-errors';
import generateToken from '../auth/generateToken';
import statusCodes from '../statusCode';
import { Payload, UserLogin } from '../interfaces';

class LoginController {
  constructor( 
    private userService = new UserService(),
  ) { }

  // em classe não devemos usar arrow function, com arrow function o this referencia quem chamou (Controller).
  // com método funcional, devemos usar callback no router;
  async login(req: Request, res: Response) {
    const userLogin: UserLogin = req.body;
    console.log(this);
    const { error, message, user } = await this.userService.getByUsername(userLogin);
    if (error) {
      return res.status(error).json({ message });
    }
    const payload: Payload = { id: user.id, username: userLogin.username };
    const token: string = generateToken(payload);
    return res.status(statusCodes.OK).json({ token });
  }
}

export default LoginController;