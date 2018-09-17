/* eslint-disable max-len */
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // this regex was obtained from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
/**
 * @description contains methods that validates input for login and signup routes
 */
class userValidation {
  /**
   * @description - method that verifies token
   * @param {object} req - the request object
   * @param {object} res - the response object
   * @param {function} next - the callback function
   * @returns {object} - status code and error
   */
  signupMiddleware(req, res, next) {
    const {
      name,
      email,
      password,
      confirmPassword,
      username,
      address
    } = req.body;
    if (name === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'name field is required'
      });
    }
    if (typeof (name) !== 'string') {
      return res.status(400).send({
        status: 'error',
        error: 'invalid data type, only strings are allowed'
      });
    }
    if (!name.trim()) {
      return res.status(400).send({ status: 'error', error: 'name field cannot be blank' });
    }
    if (email === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'email field is required'
      });
    }
    if (!re.test(String(email).toLowerCase())) {
      return res.status(400).send({
        status: 'error',
        error: 'invalid email'
      });
    }
    if (password === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'password field is required'
      });
    }
    if (confirmPassword === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'confirmPassword field is required'
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).send({ error: 'password mismatch' });
    }
    if (username === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'username field is required'
      });
    }
    if (typeof (username) !== 'string') {
      return res.status(400).send({
        status: 'error',
        error: 'only strings are allowed for the username field'
      });
    }
    if (!username.trim() || username.includes(' ') || username.includes('\n') || username.includes('\t')) {
      return res.status(400).send({
        status: 'error',
        error: 'space character is invalid for username field'
      });
    }
    if (address === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'address field is required'
      });
    }
    if (typeof (address) !== 'string') {
      return res.status(400).send({
        status: 'error',
        error: 'only strings are allowed for the address field'
      });
    }
    if (!address.trim()) {
      return res.status(400).send({ status: 'error', error: 'address field cannot be blank' });
    }
    return next();
  }

  /**
   * @description - method that verifies token
   * @param {object} req - the request object
   * @param {object} res - the response object
   * @param {function} next - the callback function
   * @returns {object} - status code and error
   */
  loginMiddleware(req, res, next) {
    const {
      email,
      password
    } = req.body;
    if (email === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'email field is required'
      });
    }
    if (!re.test(String(email).toLowerCase())) {
      return res.status(400).send({
        status: 'error',
        error: 'invalid email'
      });
    }
    if (password === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'password field is required'
      });
    }
    return next();
  }
}
export default new userValidation();
