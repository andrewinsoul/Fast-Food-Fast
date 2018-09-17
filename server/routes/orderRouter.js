import express from 'express';
import orderController from '../controllers/orders';
import checkResourceId from '../middlewares/checkResourceId';
import validator from '../middlewares/validateFunction';

const orderRouter = express.Router();

orderRouter
  .post('/orders', validator.placeOrder, orderController.placeAnOrder)
  .get('/orders/:id',
    validator.getOrder, checkResourceId, orderController.getAnOrder)
  .get('/orders', orderController.getAllOrders)
  .put('/orders/:id',
    validator.updateOrder, checkResourceId, orderController.updateAnOrder);
export default orderRouter;
