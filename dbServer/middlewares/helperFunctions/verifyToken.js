import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();
const key = process.env.KEY;

/**
   * @description - function that verifies the authencity of a token
   * @param {object} req - the request object
   * @param {object} res - the response object
   * @param {function} next - the callback function
   * @returns {object} - status code and error
   */
function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'] || req.body.token;
  if (!token) {
    return res.status(403).send({
      status: 'error',
      error: 'No token provided'
    });
  }
  jwt.verify(
    token,
    key,
    (error, decoded) => {
      if (error) {
        return res.status(401).send({
          status: 'error',
          error: 'Failed to authenticate token'
        });
      }
      req.userId = decoded.id;
      return next();
    }
  );
}
export default verifyToken;
