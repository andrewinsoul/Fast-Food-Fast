/* eslint-disable max-len */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import config from '../config/config';

dotenv.load();
const key = process.env.KEY;

/**
 * @description contains methods that manipulates data from user model
 */
class UserController {
  /**
   * @description - method that signs up a user, the first user to sign up is added as admin whereas the rest are stored as mere users
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  signupUser(req, res) {
    const encodedPassword = bcrypt.hashSync(req.body.password, 8);
    const {
      username,
      email,
      address,
      phone,
    } = req.body;
    config.query('SELECT * FROM users LIMIT 1').then(
      (selectResult) => {
        if (selectResult.rowCount === 0) {
          const role = true;
          config.query(
            'INSERT INTO users(username, email, address, password, phone, user_role) values ($1, $2, $3, $4, $5, $6) RETURNING *', [username, email, address, encodedPassword, phone, role],
          ).then(
            (result) => {
              const token = jwt.sign(
                {
                  id: result.rows[0].userid,
                },
                key,
                {
                  expiresIn: 86400,
                }
              );
              return res.status(201).send(
                {
                  status: 'success',
                  token,
                  message: 'admin signup successful'
                }
              );
            },
          )
            .catch(error => res.status(409).send({
              status: 'error',
              error: error.detail
            }));
        } else {
          config.query(
            'INSERT INTO users(username, email, address, password, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *', [username, email, address, encodedPassword, phone],
          ).then(
            (result) => {
              const token = jwt.sign(
                {
                  id: result.rows[0].userid,
                },
                key,
                {
                  expiresIn: 86400,
                }
              );
              return res.status(201).send(
                {
                  status: 'success',
                  token,
                  message: 'signup successful'
                }
              );
            },
          )
            .catch(error => res.status(409).send({
              status: 'error',
              error: error.detail
            }));
        }
      }
    );
  }
}
export default new UserController();
