import { Request, Response } from 'express';
import statusCodes from '../statusCode';
import UserService from '../services/user.service';
import 'express-async-errors';
import generateToken from '../auth/generateToken';

class UserController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const user = req.body;
    const payload = await this.userService.create(user);

    const token = generateToken(payload);
    res.status(statusCodes.CREATED).json({ token });
  };
}

export default UserController;