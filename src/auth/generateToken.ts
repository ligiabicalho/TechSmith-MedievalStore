import jwt from 'jsonwebtoken';
import { Payload } from '../interfaces';

export default function generateToken(payload: Payload): string {
  const token = jwt.sign(payload, 'secret');
  return token;
}