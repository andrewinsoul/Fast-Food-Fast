import order from '../models/order';

class Order {
  getAllOrders(req, res) {
    return res.status(200).send({ status: 'success', message: order });
  }
}
export default new Order();
