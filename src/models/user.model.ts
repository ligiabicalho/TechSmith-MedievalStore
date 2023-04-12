import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import connection from './connection';
import { Payload, User, IUser } from '../interfaces';

export default class UserModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public async getByUsername(username: string): Promise<User> {
    const [[user]] = await this.connection.execute<(
    User & RowDataPacket)[]>('SELECT * FROM Trybesmith.users WHERE username = ?',
      [username],
      );
    return user;
  }

  public async getById(id: number): Promise<User> {
    const [[user]] = await this.connection.execute<(
    User & RowDataPacket)[]>('SELECT id, username FROM Trybesmith.users WHERE id = ?',
      [id],
      );
    return user;
  }

  public async create(user: IUser): Promise<Payload> {
    const { username, vocation, level, password } = user;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.users (username, vocation, level, password) VALUES (?, ?, ?, ?)',
      [username, vocation, level, password],
    );
    const payload: Payload = { id: insertId, username };
    return { ...payload };
  }
}