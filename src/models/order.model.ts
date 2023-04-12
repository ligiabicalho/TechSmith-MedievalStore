import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import connection from './connection';
import { Order, OrderId } from '../interfaces';
// import ProductModel from './product.model';

export default class OrderModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  async getAll(): Promise<Order[]> {
    const [orders] = await this.connection.execute<(
    Order & RowDataPacket)[]>(`
    SELECT
      p.order_id AS id, 
      o.user_id AS userId, 
      JSON_ARRAYAGG(p.id) AS productsIds
    FROM Trybesmith.products AS p 
    INNER JOIN Trybesmith.orders AS o 
    ON o.id = p.order_id
    GROUP BY p.order_id;`,
      );
    return orders;
  }

  // userId de qm fez a solicitação
  async create(userId: number): Promise<number> {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.orders (user_id) VALUES (?)',
      [userId],
    );
    // alterar orderId (insertId) na tabela products 
    return insertId;
  }
}