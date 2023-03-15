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

  public login = async (req: Request, res: Response) => {
    const userLogin: UserLogin = req.body;

    const { error, message, user } = await this.userService.getByUsername(userLogin);
    if (error) {
      return res.status(error).json({ message });
    }
    const payload: Payload = { id: user.id, username: userLogin.username };
    const token: string = generateToken(payload);
    res.status(statusCodes.OK).json({ token });
  };
}

export default LoginController;