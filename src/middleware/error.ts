import { Request, Response, NextFunction } from 'express';

export default class MiddlewareError {
  static handle(error: Error, req: Request, res: Response, next: NextFunction) {
    const { name, message } = error;
    switch (name) {
      case 'BadRequestError':
        res.status(400).json({ message });
        break;
      case 'ValidationError':
        res.status(400).json({ message });
        break;
      case 'NotFoundError':
        res.status(404).json({ message });
        break;
      case 'ConflictError':
        res.status(409).json({ message });
        break;
      default:
        res.status(500).json({ message: error.message });
        next();
    }
  }
}