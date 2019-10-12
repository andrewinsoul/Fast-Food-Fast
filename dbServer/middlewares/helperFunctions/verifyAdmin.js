import config from '../../config';

/**
  * @description - method that checks if a user is an admin
  * @param {object} req - the request object
  * @param {object} res - the response object
  * @param {function} next - the callback function
  * @returns {object} - status code and error
*/
function verifyAdmin(req, res, next) {
  const { userId } = req;
  const sqlQueryString = `
  SELECT user_role FROM users WHERE userId = ($1) LIMIT 1`;
  config.query(sqlQueryString, [userId]).then((result) => {
    if (result.rows[0].user_role) {
      return next();
    }
    return res.status(403).send({
      status: 'error',
      error: 'forbidden access, only admin is allowed.'
    });
  }).catch(error => res.status(500).send(error));
}
export default verifyAdmin;
