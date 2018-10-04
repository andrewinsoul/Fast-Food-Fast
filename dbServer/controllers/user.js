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
    config.query(
      `INSERT INTO users(
        username,
        email,
        address,
        password,
        phone) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [username, email, address, encodedPassword, phone]
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
        return res.status(201).send({
          status: 'success',
          token,
          message: 'signup successful'
        });
      }
    ).catch((err) => {
      const errorDetail = err.detail;
      let error;
      if (errorDetail.includes('email')) {
        error = 'user with email already exists';
      } else {
        error = 'user with username already exists';
      }
      return res.status(409).send({
        status: 'error',
        error
      });
    });
  }

  /**
   * @description - method that logins a user
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
      'SELECT userid, email, password FROM users WHERE email=($1) LIMIT 1',
      [email]
    ).then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).send({
          status: 'error',
          error: 'user with email not found'
        });
      }
      const isPasswordValid = bcrypt.compareSync(password, result.rows[0].password);
      if (!isPasswordValid) {
        return res.status(401).send({
          status: 'error',
          error: 'incorrect password'
        });
      }
      const token = jwt.sign(
        {
          id: result.rows[0].userid
        },
        key,
        {
          expiresIn: 86400
        }
      );
      return res.status(200).send({
        status: 'success',
        token,
        message
      });
    });
  }
}
export default new UserController();
