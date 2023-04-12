import express from 'express';
import ProductRouter from './routes/product.router';
import UserRouter from './routes/user.router';
import OrderRouter from './routes/order.router';
import LoginRouter from './routes/login.router';
import errorHandler from './middleware/error';
import { isRequiredUsername, isRequiredPassword } from './middleware/loginValidate';

const app = express();

app.use(express.json());
app.use('/products', ProductRouter);
app.use('/users', UserRouter);
app.use('/orders', OrderRouter);
app.use('/login', isRequiredUsername, isRequiredPassword, LoginRouter);

app.use(errorHandler);

export default app;
