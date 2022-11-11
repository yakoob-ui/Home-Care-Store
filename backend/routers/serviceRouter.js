import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Service from '../models/serviceModel.js';
import { isAdmin, isAuth } from '../utils.js';

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

serviceRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const service = new Service({
      name: 'sample name ' + Date.now(),
      image: '/images/p1.jpg',
      price: 0,
      category: 'sample category',
      provider: 'sample provider',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    });
    const createdService = await service.save();
    res.send({ message: 'Service Created', service: createdService });
  })
);

serviceRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const serviceId = req.params.id;
    const service = await Service.findById(serviceId);
    if (service) {
      service.name = req.body.name;
      service.price = req.body.price;
      service.image = req.body.image;
      service.category = req.body.category;
      service.provider = req.body.provider;
      service.countInStock = req.body.countInStock;
      service.description = req.body.description;
      const updatedService = await service.save();
      res.send({ message: 'Service Updated', service: updatedService });
    } else {
      res.status(404).send({ message: 'Service Not Found' });
    }
  })
);

serviceRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);
    if (service) {
      const deleteService = await service.remove();
      res.send({ message: 'Service Deleted', service: deleteService });
    } else {
      res.status(404).send({ message: 'Service Not Found' });
    }
  })
);

export default serviceRouter;
