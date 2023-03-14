import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import connection from './connection';
import { Payload, User } from '../interfaces';

export default class UserModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public async create(user: User): Promise<Payload> {
    const { username, vocation, level, password } = user;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.users (username, vocation, level, password) VALUES (?, ?, ?, ?)',
      [username, vocation, level, password],
    );
    const payload: Payload = { id: insertId, username };
    return { ...payload };
  }
}