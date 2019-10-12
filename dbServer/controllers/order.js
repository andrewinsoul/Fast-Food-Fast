/* eslint-disable max-len */
import config from '../config';
import { handleResponseError } from '../utils/errorHandler';

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
      SELECT
        C.orderId,
        C.quantity,
        C.status, 
        C.createdAt, 
        m.food,
        (m.price*c.quantity) AS "TOTAL PRICE",
        U.username, 
        U.address, 
        U.phone
      FROM cart c
      JOIN users u ON c.userId = u.userId
      JOIN menu m ON c.menuid = m.foodid
      ORDER BY c.createdat DESC
     `).then((result) => {
      if (result.rowCount === 0) {
        const error = 'No order found';
        return handleResponseError(res, error, 404);
      }
      return res.status(200).send({
        status: 'success',
        allOrders: result.rows
      });
    }).catch(error => handleResponseError(res, error, 500));
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
        const error = 'order not found';
        return handleResponseError(res, error, 404);
      }
      return res.status(200).send({
        status: 'success',
        message: 'updated successfully',
        data: result.rows[0]
      });
    }).catch(error => handleResponseError(res, error, 500));
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
        const error = 'order not found';
        handleResponseError(res, error, 404);
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
    const { userId, userAdmin } = req;
    const userParamId = Number(req.params.userId);

    if (userId !== userParamId && !userAdmin) {
      const error = 'unauthorized access, cannot view another user history order';
      return handleResponseError(res, error, 401);
    }
    config.query(`
    SELECT
      address,
      phone,
      email,
      orderId,
      food,
      quantity,
      (quantity * price) AS "TOTAL PRICE",
      status,
      c.createdAt 
    FROM cart c
    JOIN users u ON u.userid = c.userid
    JOIN menu m ON m.foodid = c.menuid
    WHERE c.userId=($1)`, [userParamId]).then((result) => {
      if (result.rowCount === 0) {
        const error = 'you have no order history';
        return handleResponseError(res, error, 404);
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
    config.query(
      `INSERT INTO cart(menuId, quantity, userid) VALUES ${req.queryString} RETURNING *`
    ).then(
      (result) => {
        res.status(201).send({
          status: 'success',
          message: 'order placed successfully',
          orders: result.rows
        });
      }
    ).catch((error) => {
      if (Number(error.code) === 23503) {
        return handleResponseError(res, error.detail, 404);
      }
      return handleResponseError(res, error, 500);
    });
  }
}
export default new Order();
