import express from 'express';
import ProductRouter from './routes/product.routes';
import middlewareError from './middleware/error';

const app = express();

app.use(express.json());
app.use('/products', ProductRouter);
app.use(middlewareError);

export default app;
