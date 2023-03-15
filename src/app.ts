import express from 'express';
import ProductRouter from './routes/product.router';
import UserRouter from './routes/user.router';
import OrderRouter from './routes/order.router';
import middlewareError from './middleware/error';

const app = express();

app.use(express.json());
app.use('/products', ProductRouter);
app.use('/users', UserRouter);
app.use('/orders', OrderRouter);

app.use(middlewareError);

export default app;
