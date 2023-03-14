import UserModel from '../models/user.model';
import { Payload, User } from '../interfaces';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async create(user: User): Promise<Payload> {
    const payload = await this.model.create(user);
    return payload;
  }
}

export default UserService;