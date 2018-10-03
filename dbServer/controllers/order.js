/* eslint-disable max-len */
import config from '../config/config';

/**
 * @description contains methods that manipulates data from order models
 */
class Order {
  /**
   * @description - method that allows admin user get all orders
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  getAllOrders(req, res) {
    config.query(`
      SELECT * FROM cart
    `).then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).send({
          status: 'error',
          error: 'No order found'
        });
      }
      return res.status(200).send({
        status: 'success',
        message: result.rows
      });
    });
  }

  /**
   * @description - method that allows admin user update status of an order
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  updateOrderStatus(req, res) {
    const { status } = req.body;
    const { orderId } = req.params;
    config.query(`
      UPDATE cart SET status = ($1) WHERE orderId = ($2) RETURNING *
    `, [status, orderId]).then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).send({
          status: 'error',
          error: 'order not found'
        });
      }
      return res.status(200).send({
        status: 'success',
        message: 'updated successfully',
        data: result.rows[0]
      });
    }).catch(error => res.status(500).send({ error }));
  }

  /**
   * @description - method that allows admin user get an order
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  getAnOrder(req, res) {
    const { orderId } = req.params;
    config.query(`
      SELECT * FROM cart WHERE orderId = ($1) LIMIT 1`,
    [orderId]).then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).send({
          status: 'error',
          error: 'order not found'
        });
      }
      return res.status(200).send({
        status: 'success',
        message: result.rows[0]
      });
    });
  }
}
export default new Order();
