import config from '../config';
import { handleResponseError } from '../utils/errorHandler';

/**
 * @description contains method that manipulates data from menu model
 */
class Menu {
  /**
   * @description - method that allows admin user creates menu
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  createMenu(req, res) {
    const {
      foodName,
      category,
      price,
      description,
    } = req.body;
    const InsertQuery = `
      INSERT INTO menu(
        food,
        description,
        category,
        price,
        userId) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    config.query(
      InsertQuery, [foodName, description, category, price, req.userId]
    ).then(
      (result) => {
        res.status(201).send({
          status: 'success',
          message: 'menu successfully created',
          menu: result.rows[0]
        });
      }
    ).catch(error => handleResponseError(res, error, 500));
  }

  /**
   * @description - method that allows user gets available menu
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  getAvailableMenu(req, res) {
    config.query(`
      SELECT foodId, food, price, description, category FROM menu
    `).then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).send({
          status: 'error',
          message: 'no menu added by admin'
        });
      }
      return res.status(200).send({
        status: 'success',
        menuList: result.rows
      });
    })
      .catch(error => handleResponseError(res, error, 500));
  }

  /**
   * @description - method that allows user gets available menu by category
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Passes the control to the next method
   * @returns {object} - status code and server message
   */
  getMenuByCategory(req, res, next) {
    const { category } = req.query;
    if (category === undefined) return next();
    config.query(`
      SELECT foodId, food, price, description, category FROM menu
      WHERE category = INITCAP($1)`, [category]).then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).send({
          status: 'error',
          message: `no food with ${category} found`
        });
      }
      return res.status(200).send({
        status: 'success',
        menuList: result.rows
      });
    })
      .catch(error => handleResponseError(res, error, 500));
  }

  /**
   * @description - method that searches the menu by foodname
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next function
   * @returns {object} - status code and server message
   */
  searchMenuByName(req, res, next) {
    if (req.query.key === undefined) return next();
    config.query(`
      SELECT foodId, food FROM menu WHERE food LIKE LOWER('%${req.query.key}%')
    `).then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).send({
          status: 'error',
          messsage: `${req.query.key} not found`
        });
      }
      return res.status(200).send({
        status: 'success',
        data: result.rows
      });
    })
      .catch(error => handleResponseError(res, error, 500));
  }

  /**
   * @description - method that searches the menu by category
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  searchMenuByCategory(req, res) {
    if (req.query.category === undefined) {
      const error = 'filter parameter not provided';
      return handleResponseError(res, error, 400);
    }
    config.query(`
      SELECT foodId, food, category
        FROM menu WHERE food LIKE INITCAP('%${req.query.category}%')
    `).then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).send({
          status: 'error',
          messsage: `${req.query.category} not found`
        });
      }
      return res.status(200).send({
        status: 'success',
        data: result.rows
      });
    })
      .catch(error => handleResponseError(res, error, 500));
  }
}
export default new Menu();
