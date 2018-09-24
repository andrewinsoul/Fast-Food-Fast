/* eslint-disable max-len */
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // this regex was obtained from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
/**
 * @description contains methods that validates input
 */
class validation {
  /**
   * @description - method that validates user input during sign up
   * @param {object} req - the request object
   * @param {object} res - the response object
   * @param {function} next - the callback function
   * @returns {object} - status code and error
   */
  signupMiddleware(req, res, next) {
    const {
      username,
      email,
      address,
      password,
      phone
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
    if (phone === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'phone field is required'
      });
    }
    if (!phone.trim() || phone.includes(' ') || phone.includes('\n') || phone.includes('\t')) {
      return res.status(400).send({
        status: 'error',
        error: 'space character is not allowed in phone field'
      });
    }
    if (isNaN(Number(phone))) {
      return res.status(400).send({
        status: 'error',
        error: 'Invalid phone number'
      });
    }
    if (String(phone).length !== 11) {
      return res.status(400).send({
        status: 'error',
        error: 'phone must be 11 digits'
      });
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
      return res.status(400).send({
        status: 'error',
        error: 'address field cannot be blank'
      });
    }
    return next();
  }
}
export default new validation();
