import express from 'express';
import orderController from '../controllers/orders';

const orderRouter = express.Router();

orderRouter
  .post('/orders', orderController.placeAnOrder)
  .get('/orders/:id', orderController.getAnOrder)
  .get('/orders', orderController.getAllOrders)
  .put('/orders/:id', orderController.updateAnOrder);
export default orderRouter;
