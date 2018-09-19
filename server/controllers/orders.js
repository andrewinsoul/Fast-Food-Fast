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

  getAnOrder(req, res) {
    const index = orderData.findIndex(order => order.id === Number(req.params.id));
    return res.status(200).send({ status: 'success', order: orderData[index] });
  }

  updateAnOrder(req, res) {
    const message = 'status of order successfully updated';
    const index = orderData.findIndex(order => order.id === Number(req.params.id));
    orderData[index].status = req.body.status;
    return res.status(200).send({ status: 'success', message });
  }
}
export default new Order();