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
    ).catch((error) => {
      res.status(500).send({
        status: 'error',
        error
      });
    });
  }

  /**
   * @description - method that allows user gets available menu
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  getAvailableMenu(req, res) {
    config.query(`
      SELECT foodId, food, category, price, description FROM menu
    `).then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).send({
          status: 'success',
          error: 'no menu added by admin'
        });
      }
      return res.status(200).send({
        status: 'success',
        menuList: result.rows
      });
    });
  }
}
export default new Menu();
