export interface Product {
  id?: number;
  name: string;
  amount: string;
  orderId?: number;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface IUser extends UserLogin {
  vocation: string;
  level: number;
}

export interface User extends IUser {
  id: number;   
}

export interface Payload {
  id: number;
  username: string;
}

export interface Order {
  id: number;
  userId: number;
  productsIds: number[];
}