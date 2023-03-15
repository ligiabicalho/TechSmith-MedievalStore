import UserModel from '../models/user.model';
import { Payload, IUser, UserLogin } from '../interfaces';

class UserService {
  public userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  public async getByUsername({ username, password }: UserLogin) {
    const user = await this.userModel.getByUsername(username);
    if (!user || user.password !== password) {
      // qndo não envia user no retorno, o TS reclama no controller linha 20. Pq??
      return { error: 401, message: 'Username or password invalid', user };
    }
    return { error: null, user };
  }

  public async create(user: IUser): Promise<Payload> {
    const payload = await this.userModel.create(user);
    return payload;
  }
}

export default UserService;