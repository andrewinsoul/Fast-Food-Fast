import express from 'express';
import orderController from '../controllers/orders';
import helperFunction from '../middlewares/helperFunction';
import validator from '../middlewares/validateFunction';

const orderRouter = express.Router();

orderRouter
  .post('/orders', validator.placeOrder, orderController.placeAnOrder)
  .get('/orders/:id', validator.getOrder, helperFunction, orderController.getAnOrder)
  .get('/orders', orderController.getAllOrders)
  .put('/orders/:id', validator.updateOrder, helperFunction, orderController.updateAnOrder);
export default orderRouter;
