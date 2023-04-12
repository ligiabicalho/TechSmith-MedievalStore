import { JwtPayload } from 'jsonwebtoken';

export interface ProductId { // separar e extender
  id: number;
}

export interface ProductCreateReq { // separar e extender
  name: string;
  amount: string;
}

export interface ProductCreateRes extends ProductId, ProductCreateReq {
}

export interface Product extends ProductCreateRes { 
  orderId: number;
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

export interface Decoded extends JwtPayload {
  id: number;
  username: string;
  iat: number;
}

export interface OrderReq {
  ProductsIds: number[];
}

export interface OrderRes extends OrderReq {
  userId: number;
}

export interface OrderId {
  id: number;
}

export interface Order extends OrderRes, OrderId {
}