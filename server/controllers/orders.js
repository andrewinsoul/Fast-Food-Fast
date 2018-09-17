import orderData from '../models/order';

class Order {
  getAllOrders(req, res) {
    return res.status(200).send({ status: 'success', message: orderData });
  }

  placeAnOrder(req, res) {
    const {
      name, order, address, status,
    } = req.body;
    const orderDetails = {
      id: orderData.length + 1,
      name,
      order,
      address,
      status,
    };
    orderData.push(orderDetails);
    return res.status(201).send({ status: 'success', order: orderDetails });
  }
}
export default new Order();
