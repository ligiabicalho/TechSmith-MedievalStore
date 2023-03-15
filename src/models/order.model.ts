import { Pool, RowDataPacket } from 'mysql2/promise';
import connection from './connection';
import { Order } from '../interfaces';

export default class OrderModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const [orders] = await this.connection.execute<(
    Order & RowDataPacket)[]>(`
    SELECT p.order_id AS id, o.user_id AS userId, JSON_ARRAYAGG(p.id) AS productsIds
      FROM Trybesmith.products AS p INNER JOIN Trybesmith.orders AS o ON o.id = p.order_id
      GROUP BY p.order_id;`,
      );
    return orders;
  }
}