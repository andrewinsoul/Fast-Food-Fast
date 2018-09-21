import { orders } from '../models/order';

/**
 * @description contains methods that manipulates data from order model
 */
class Order {
  /**
   * @description - method that fetches all orders
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  getAllOrders(req, res) {
    return res.status(200).send({ status: 'success', message: orders });
  }

  /**
   * @description - method that adds an order to array of orders
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} -status code and server message
   */
  placeAnOrder(req, res) {
    const orderDetails = Object.assign(
      req.body, {
        orderId: orders.length + 1,
        date: new Date(Date.now()),
        status: 'waiting',
      }
    );
    orders.push(orderDetails);
    return res.status(201).send({ status: 'success', order: orderDetails });
  }

  /**
   * @description - method that fetches an order based on id param
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  getAnOrder(req, res) {
    const index = orders.findIndex(
      order => order.orderId === Number(req.params.id)
    );
    return res.status(200).send({ status: 'success', order: orders[index] });
  }

  /**
   * @description - method that updates the status of an order based on id param
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  updateAnOrder(req, res) {
    const message = 'status of order successfully updated';
    const index = orders.findIndex(
      order => order.orderId === Number(req.params.id)
    );
    orders[index].status = req.body.status;
    return res.status(200).send({
      status: 'success', message, order: orders
    });
  }
}
export default new Order();
