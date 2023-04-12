import UserModel from '../models/user.model';
import { Payload, IUser, UserLogin } from '../interfaces';
import StatusCodes from '../statusCode';

class UserService {
  public userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async getByUsername({ username, password }: UserLogin) {
    const user = await this.userModel.getByUsername(username);
    if (!user || user.password !== password) {
      // qndo não envia user no retorno, o TS reclama no controller linha 20. Pq??
      return { error: { status: StatusCodes.UNAUTHORIZED, 
        message: 'Username or password invalid' },
      user };
    }
    return { error: null, user };
  }

  async getById(id: number) {
    const user = await this.userModel.getById(id);
    if (!user) {
      return { error: { status: StatusCodes.UNAUTHORIZED, 
        message: 'Id invalid' },
      user };
    }
    return { error: null, user };
  }

  async create(user: IUser): Promise<Payload> {
    const payload = await this.userModel.create(user);
    return payload;
  }
}

export default UserService;