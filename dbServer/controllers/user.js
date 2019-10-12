/* eslint-disable max-len */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { comparePassword, encodePassword } from "../utils/passwordUtil";
import config from '../config';
import { handleResponseError } from '../utils/errorHandler';

dotenv.load();
const key = process.env.KEY;

/**
 * @description contains methods that manipulates data from user model
 */
class UserController {
  /**
   * @description - method that signs up a user
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  signupUser(req, res) {
    const encodedPassword = encodePassword(req.body.password);
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
        phone) VALUES ($1, LOWER($2), $3, $4, $5) RETURNING *`, [username, email, address, encodedPassword, phone]
    ).then(
      (result) => {
        const token = jwt.sign(
          {
            id: result.rows[0].userid,
            userType: result.rows[0].user_role
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
      return handleResponseError(res, error, 409);
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
      'SELECT userid, email, password, user_role FROM users WHERE email=($1) LIMIT 1',
      [email]
    ).then((result) => {
      if (result.rowCount === 0) {
        const error = 'user with email not found';
        return handleResponseError(res, error, 404);
      }
      const isPasswordValid = comparePassword(result.rows[0].password, password);
      if (!isPasswordValid) {
        const error = 'incorrect password';
        return handleResponseError(res, error, 401);
      }
      const token = jwt.sign(
        {
          id: result.rows[0].userid,
          userAdmin: result.rows[0].user_role
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

  /**
   * @description - method that updates a user
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  updateUser(req, res) {
    const messageSuccess = 'update successful';
    config.query(
      'UPDATE users SET email=($1), username=($2), password=($3), phone=($4), address=($5) WHERE userid=($6) RETURNING username, email, password, phone, address', [
        req.newEmail,
        req.newUsername,
        req.newPassword,
        req.newPhone,
        req.newAddress,
        req.userId,
      ],
    ).then(result => res.status(200).send(
      {
        status: 'success',
        message: messageSuccess,
        data: result.rows,
      },
    ))
      .catch(error => handleResponseError(res, error, 500));
  }
}
export default new UserController();
