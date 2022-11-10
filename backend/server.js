import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import data from './data.js';
import userRouter from './routers/userRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get('/api/services/:id', (req, res) => {
  const service = data.services.find((x) => x._id === req.params.id);
  if (service) {
    res.send(service);
  } else {
    res.status(404).send({ message: 'Service Not Found' });
  }
});

app.get('/api/services', (req, res) => {
  res.send(data.services);
});
app.use('/api/users', userRouter);
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
