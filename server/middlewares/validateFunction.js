import { foodList } from '../models/order';
/* eslint-disable prefer-const */
/* eslint-disable max-len */
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
      userId,
      order,
      address,
    } = req.body;
    if (userId === undefined) {
      return res.status(400).send(
        { status: 'error', error: 'the userId is required' }
      );
    }
    if (isNaN(Number(userId))) {
      return res.status(400).send(
        {
          status: 'error',
          error: 'userId should be a number'
        }
      );
    }
    if (!(parseInt(Number(userId), 10) === Number(userId))) {
      return res.status(400).send(
        { status: 'error', error: 'userId must be an integer' }
      );
    }
    for (let i = 0; i < order.length; i += 1) {
      let foodIndex = foodList.findIndex(foodItem => Number(foodItem.foodId) === Number(order[i].foodId));
      if (foodIndex === -1) return res.status(404).send({ status: 'error', error: `foodId ${order[i].foodId} not found` });
    }
    if (address === undefined) {
      return res.status(400).send({ status: 'error', error: 'the address field is required' });
    }
    if (order === undefined) {
      return res.status(400).send(
        { status: 'error', error: 'the order field is required' }
      );
    }
    if (!(Array.isArray(order))) {
      console.log(order);
      return res.status(400).send({
        status: 'error',
        error: 'order must be array of objects'
      });
    }

    if (order.length === 0) {
      return res.status(400).send({
        status: 'error',
        error: 'cannot place an empty order'
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
    return next();
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
    if (isNaN(req.params.id)) {
      return res.status(400).send({
        status: 'error',
        error: 'id param should be a number'
      });
    }
    if (!(parseInt(req.params.id, 10) === Number(req.params.id))) {
      return res.status(400).send({
        status: 'error',
        error: 'param should be an integer'
      });
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
    if (
      status.toLowerCase() === 'waiting'
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
        error: 'id params should be a number'
      });
    }
    if (!(parseInt(req.params.id, 10) === Number(req.params.id))) {
      return res.status(400).send({ status: 'error', error: 'param should be an integer' });
    }
    return next();
  }
}
export default new Validator();
