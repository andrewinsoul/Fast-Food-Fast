import express from 'express';
import verifyToken from '../middlewares/helperFunctions/verifyToken';
import verifyAdmin from '../middlewares/helperFunctions/verifyAdmin';
import order from '../controllers/order';
import validation from '../middlewares/validation';

const orderRouter = express.Router();

orderRouter
  .get('/orders',
    verifyToken,
    verifyAdmin,
    order.getAllOrders)
  .put('/orders/:orderId',
    verifyToken,
    verifyAdmin,
    validation.checkParam,
    validation.updateStatus,
    order.updateOrderStatus);

export default orderRouter;