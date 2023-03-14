import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import connection from './connection';
import { Product } from '../interfaces';

export default class ProductModel {
  private connection: Pool; // pq precisa colocar public/private??

  constructor() {
    this.connection = connection;
  }

  public async getAll(): Promise<Product[]> {
    const [products] = await this.connection.execute<(
    Product & RowDataPacket)[]>('SELECT * FROM Trybesmith.products',
      );
    return products;
  }

  public async getById(id: number): Promise<Product> {
    const [[product]] = await this.connection.execute<(
    Product & RowDataPacket)[]>(
      'SELECT * FROM Trybesmith.products WHERE id = ?',
      [id],
      );
    return product;
  }

  public async create(product: Product): Promise<Product> {
    const { name, amount } = product;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const newProduct: Product = await this.getById(insertId);
    
    return { id: insertId, ...newProduct };
  }
}