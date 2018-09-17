import express from 'express';
import orderController from '../controllers/order';

const orderRouter = express.Router();

orderRouter.get('/orders', orderController.getAllOrders);
export default orderRouter;
