import { NextFunction, Request, Response } from 'express';
import statusCodes from '../statusCode';
import UserService from '../services/user.service';
import 'express-async-errors';
import generateToken from '../auth/generateToken';

class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.body;
      const payload = await this.userService.create(user);

      const token = generateToken(payload);
      res.status(statusCodes.CREATED).json({ token });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;