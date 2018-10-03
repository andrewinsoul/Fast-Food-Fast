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
}
export default new Order();
