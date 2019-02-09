/* eslint-disable max-len */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import config from '../config/config';
import { re } from '../middlewares/validation';

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
      username, email, address, phone
    } = req.body;
    config
      .query(
        `INSERT INTO users(
        username,
        email,
        address,
        password,
        phone) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [username, email, address, encodedPassword, phone]
      )
      .then((result) => {
        const token = jwt.sign(
          {
            id: result.rows[0].userid,
            userType: result.rows[0].user_role
          },
          key,
          {
            expiresIn: 86400
          }
        );
        return res.status(201).send({
          status: 'success',
          token,
          message: 'signup successful'
        });
      })
      .catch((err) => {
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
    const { email, password } = req.body;
    config
      .query(
        'SELECT userid, email, password, user_role FROM users WHERE email=($1) LIMIT 1',
        [email]
      )
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404).send({
            status: 'error',
            error: 'user with email not found'
          });
        }
        const isPasswordValid = bcrypt.compareSync(
          password,
          result.rows[0].password
        );
        if (!isPasswordValid) {
          return res.status(401).send({
            status: 'error',
            error: 'incorrect password'
          });
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
   * @description - method that updates profile of a user
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - status code and server message
   */
  async updateUser(req, res) {
    try {
      const foundUser = await config.query(
        `
      SELECT * FROM users WHERE userId = ($1) LIMIT 1
    `,
        [req.userId]
      );
      if (!foundUser.rows.length) {
        return res
          .status(404)
          .send({ status: 'error', error: 'user not found' });
      }
      const payload = {
        username: req.body.username || foundUser.rows[0].username,
        email: req.body.email || foundUser.rows[0].email,
        address: req.body.address || foundUser.rows[0].address,
        password: req.body.password || foundUser.rows[0].password,
        phone: req.body.phone || foundUser.rows[0].phone
      };
      if (!re.test(String(payload.email).toLowerCase())) {
        return res.status(400).send({
          status: 'error',
          error: 'invalid email'
        });
      }
      if (
        !payload.phone.trim()
        || payload.phone.includes(' ')
        || payload.phone.includes('\n')
        || payload.phone.includes('\t')
      ) {
        return res.status(400).send({
          status: 'error',
          error: 'space character is not allowed in phone field'
        });
      }
      if (String(payload.phone).length !== 11) {
        return res.status(400).send({
          status: 'error',
          error: 'phone must be 11 digits'
        });
      }
      if (typeof payload.username !== 'string') {
        return res.status(400).send({
          status: 'error',
          error: 'only strings are allowed for the username field'
        });
      }
      if (
        !payload.username.trim()
        || payload.username.includes(' ')
        || payload.username.includes('\n')
        || payload.username.includes('\t')
      ) {
        return res.status(400).send({
          status: 'error',
          error: 'space character is invalid for username field'
        });
      }
      if (typeof (payload.address) !== 'string') {
        return res.status(400).send({
          status: 'error',
          error: 'only strings are allowed for the address field'
        });
      }
      if (!payload.address.trim()) {
        return res.status(400).send({
          status: 'error',
          error: 'address field cannot be blank'
        });
      }
      const updatedUser = await config.query(
        `
          UPDATE users SET username=($1), email=($2), address=($3), password=($4), phone=($5) WHERE userId=($6) RETURNING * 
        `,
        [
          payload.username,
          payload.email,
          payload.address,
          payload.password,
          payload.phone,
          req.userId
        ]
      );
      return res.status(200).send({
        message: 'user successfully updated',
        updatedUser: updatedUser.rows[0]
      });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }
}
export default new UserController();
