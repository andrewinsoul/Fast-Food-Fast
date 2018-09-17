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
   * @description - method that fetches all orders
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  signupUser(req, res) {
    let role;
    if (req.url === '/auth/admin/signup') {
      role = 'admin';
    } else {
      role = 'users';
    }
    const encodedPassword = bcrypt.hashSync(req.body.password, 8);
    const {
      name,
      username,
      email,
      address,
    } = req.body;
    config.query(
      'INSERT INTO users(name, username, password, email, address, role) values ($1, $2, $3, $4, $5, $6) RETURNING *', [name, username, encodedPassword, email, address, role],
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
        error: error.detail
      }));
  }

  /**
   * @description - method that fetches all orders
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  loginUser(req, res) {
    const message = 'login successful';
    const {
      email,
      password
    } = req.body;
    config.query(
      'SELECT email, password FROM users WHERE email=($1) LIMIT 1', [email],
    ).then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).send({
          status: 'error',
          token: null,
          error: 'User with mail not found.'
        });
      }
      const isPasswordValid = bcrypt.compareSync(password, result.rows[0].password);
      if (!isPasswordValid) {
        return res.status(401).send({
          status: 'error',
          token: null,
          error: 'incorrect password'
        });
      }
      const token = jwt.sign(
        {
          id: result.rows[0].userid,
        },
        key,
        {
          expiresIn: 86400,
        },
      );
      return res.status(200).send({
        status: 'success',
        token,
        message
      });
    })
      .catch(error => res.status(500).send({
        status: 'error', error: error.detail
      }));
  }
}
export default new UserController();
