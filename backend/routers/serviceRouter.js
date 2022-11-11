import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Service from '../models/serviceModel.js';

const serviceRouter = express.Router();

serviceRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const services = await Service.find({});
    res.send(services);
  })
);

serviceRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Service.remove({});
    const createdServices = await Service.insertMany(data.services);
    res.send({ createdServices });
  })
);

serviceRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);
    if (service) {
      res.send(service);
    } else {
      res.status(404).send({ message: 'Service Not Found' });
    }
  })
);

export default serviceRouter;
