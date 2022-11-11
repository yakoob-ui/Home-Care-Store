import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import serviceRouter from './routers/serviceRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGODB_URL ||
    'mongodb+srv://homecare:homecare1234@cluster0.oxzonco.mongodb.net/homeCareStore?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use('/api/users', userRouter);
app.use('/api/services', serviceRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
