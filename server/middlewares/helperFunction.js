import orderData from '../models/order';

/**
 * @desc function is created to prevent de-duplication of code in the get one and update order
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @param {*} next - the callback function
 * @returns {object} - status code and error message
 */
function Helper(req, res, next) {
  const index = orderData.findIndex(order => order.id === Number(req.params.id));
  const error = 'order not found';
  if (index === -1) return res.status(404).send({ status: 'error', error });
  return next();
}
export default Helper;
