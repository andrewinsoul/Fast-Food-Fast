import config from '../config/config';

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
      price
    } = req.body;
    const InsertQuery = `
      INSERT INTO menu(food, price, userId) VALUES ($1, $2, $3) RETURNING *`;
    config.query(InsertQuery, [foodName, price, req.userId]).then(
      (result) => {
        res.status(201).send({
          status: 'success',
          message: 'menu successfully created',
          menu: result.rows[0]
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
export default new Menu();
