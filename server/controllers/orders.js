import orderData from '../models/order';

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
    return res.status(200).send({ status: 'success', message: orderData });
  }

  /**
   * @description - method that adds an order to array of orders
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} -status code and server message
   */
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

  /**
   * @description - method that fetches an order based on id param
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  getAnOrder(req, res) {
    const index = orderData.findIndex(
      order => order.id === Number(req.params.id)
    );
    return res.status(200).send({ status: 'success', order: orderData[index] });
  }

  /**
   * @description - method that updates the status of an order based on id param
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  updateAnOrder(req, res) {
    const message = 'status of order successfully updated';
    const index = orderData.findIndex(
      order => order.id === Number(req.params.id)
    );
    orderData[index].status = req.body.status;
    return res.status(200).send({
      status: 'success', message, order: orderData
    });
  }
}
export default new Order();
