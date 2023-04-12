import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import connection from './connection';
import { OrderId, Product, 
  ProductCreateReq, ProductCreateRes } from '../interfaces';

export default class ProductModel {
  private connection: Pool; // pq precisa colocar public/private??

  constructor() {
    this.connection = connection;
  }

  async getAll(): Promise<Product[]> {
    const [products] = await this.connection.execute<(
    Product & RowDataPacket)[]>('SELECT * FROM Trybesmith.products',
      );
    return products;
  }

  async getById(id: number): Promise<Product> {
    const [[product]] = await this.connection.execute<(
    Product & RowDataPacket)[]>(
      'SELECT * FROM Trybesmith.products WHERE id = ?',
      [id],
      );
    return product;
  }

  async create(product: ProductCreateReq): Promise<Product> {
    const { name, amount } = product;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    // pesquisa por ID apenas para confirmar a inserção correta, poderia utilizar os dados recebidos na requisição.
    const newProduct: Product = await this.getById(insertId);
    
    return { ...newProduct };
  }

  async update(productId: number, updateOrderId: number): Promise<Product | void> {
    console.log('product update - prodId:', productId, 'order id:', updateOrderId);
    const result = await this.connection.execute<ResultSetHeader>(
      'UPDATE Trybesmith.products SET order_id = ? WHERE id = ?',
      [updateOrderId, productId],
    );
    if (result) { // AffectedRows
      const newProductOrder = await this.getById(productId);
      return newProductOrder;
    }
  }
}