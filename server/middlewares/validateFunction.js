/**
 * @description - contains methods that validates input
 * @class Validator
 */
class Validator {
  /**
   * @description - method that validates input for placing an order
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - call back function
   * @returns {object} - status code and error message
   */
  placeOrder(req, res, next) {
    const {
      name,
      order,
      address,
      status,
    } = req.body;
    if (req.body.name === undefined) {
      return res.status(400).send(
        { status: 'error', error: 'the name field is required' }
      );
    }
    if (typeof (name) !== 'string') {
      return res.status(400).send(
        {
          status: 'error',
          error: 'only strings are allowed for the name field'
        }
      );
    }
    if (!name.trim()) {
      return res.status(400).send(
        { status: 'error', error: 'name field cannot be blank' }
      );
    }
    if (req.body.order === undefined) {
      return res.status(400).send(
        { status: 'error', error: 'the order field is required' }
      );
    }
    if (typeof (order) !== 'string') {
      return res.status(400).send({
        status: 'error',
        error: 'only strings are allowed for the order field'
      });
    }
    if (!order.trim()) {
      return res.status(400).send({
        status: 'error',
        error: 'order field cannot be blank'
      });
    }

    if (req.body.address === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'the address field is required'
      });
    }
    if (typeof (address) !== 'string') {
      return res.status(400).send({
        status: 'error',
        error: 'only strings are allowed for the address field'
      });
    }
    if (!address.trim()) {
      return res.status(400).send({ error: 'address field cannot be blank' });
    }

    if (req.body.status === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'the status field is required'
      });
    }
    if (typeof (status) !== 'string') {
      return res.status(400).send({
        status: 'error',
        error: 'only strings are allowed for the status field'
      });
    }
    if (!status.trim()) {
      return res.status(400).send({ error: 'status field cannot be blank' });
    }
    if (status === 'wait' || status === 'declined' || status === 'accepted') {
      return next();
    }
    return res.status(400).send(
      {
        status: 'error',
        error: 'value of status should either be wait, declined or accepted'
      }
    );
  }

  /**
   * @description - method that validates input for updating an order
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - call back function
   * @returns {object} - status code and error message
   */
  updateOrder(req, res, next) {
    const { status } = req.body;
    if (req.body.status === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'the status field is required'
      });
    }
    if (typeof (status) !== 'string') {
      return res.status(400).send({
        status: 'error',
        error: 'only strings are allowed for the status field'
      });
    }
    if (!status.trim()) {
      return res.status(400).send({ error: 'status field cannot be blank' });
    }
    if (
      status.toLowerCase() === 'wait'
      || status.toLowerCase() === 'declined'
      || status.toLowerCase() === 'accepted') {
      return next();
    }
    return res.status(400).send({
      status: 'error',
      error: 'value of status should either be waiting, declined or accepted'
    });
  }

  /**
   * @description - method that validates input for fetching an order
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - call back function
   * @returns {object} - status code and error message
   */
  getOrder(req, res, next) {
    if (isNaN(req.params.id)) {
      return res.status(400).send({
        status: 'error',
        error: 'params shoudld be a number'
      });
    }
    if (!(parseInt(req.params.id, 10) === Number(req.params.id))) {
      return res.status(400).send({ status: 'error', error: '' });
    }
    return next();
  }
}
export default new Validator();
