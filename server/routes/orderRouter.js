import express from 'express';
import orderController from '../controllers/orders';

const orderRouter = express.Router();

orderRouter.get('/orders', orderController.getAllOrders);
export default orderRouter;
