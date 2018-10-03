import express from 'express';
import verifyToken from '../middlewares/helperFunctions/verifyToken';
import verifyAdmin from '../middlewares/helperFunctions/verifyAdmin';
import order from '../controllers/order';

const orderRouter = express.Router();

orderRouter
  .get('/orders',
    verifyToken,
    verifyAdmin,
    order.getAllOrders);

export default orderRouter;
