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

  /**
   * @description - method that gets the order history of a user
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  getUserOrderHistory(req, res) {
    const { userId } = req;
    config.query(`
      SELECT address, phone, email, orderId, orders, createdAt FROM users INNER JOIN cart ON (users.userid = ($1)) 
    `, [userId]).then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).send({
          status: 'error',
          error: 'you have no order history'
        });
      }
      return res.status(200).send({
        status: 'success',
        message: result.rows
      });
    });
  }

  /**
   * @description - method that allows user to place an order
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  placeOrder(req, res) {
    const { orders } = req.body;
    config.query(
      'INSERT INTO cart(orders, userid, createdAt) VALUES($1, $2, $3) RETURNING *', [
        orders,
        req.userId,
        new Date(Date.now()),
      ]
    ).then(
      (result) => {
        res.status(201).send({
          status: 'success',
          message: 'order placed successfully',
          order: result.rows[0]
        });
      }
    ).catch((error) => {
      res.status(500).send({
        status: 'error',
        error
      });
    });
  }
}
export default new Order();
