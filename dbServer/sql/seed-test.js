/* eslint-disable max-len */
import { encodePassword } from "../utils/passwordUtil";
import config from '../config';
import { handleDBError } from "../utils/errorHandler";

const password = encodePassword('password');
const BulkInsertUser = `
INSERT INTO users (
  username,
  email,
  address,
  password,
  phone
) VALUES 
    (
      'constance',
      'constance8721@gmail.com',
      'United States',
      '${password}',
      '8735446792'
    ),
    (
      'slava',
      'slavas@gmail.com',
      'Heavens Street',
      '${password}',
      '2345346577'
    )
`;

const BulkInsertMenu = `
  INSERT INTO menu (
    food,
    category,
    price,
    description,
    userId
  ) VALUES 
      (
        'Rice',
        'Foreign',
        ${2000},
        'Rice and stew added with drum stick to balance the equation all for you',
        ${1}
      ),
      (
        'Plaintain chips',
        'Fries',
        ${3000},
        'Fried plaintain and bottle of pepsi',
        ${1}
      )
`;

const bulkInsertOrder = `
  INSERT INTO cart (
    menuId,
    quantity,
    userId
  ) VALUES
      (${1}, ${3}, ${2}),
      (${2}, ${4}, ${2})
`;

config.connect()
  .then(() => {
    config.query(BulkInsertUser).then(() => {
      config.query(BulkInsertMenu).then(() => {
        config.query(bulkInsertOrder).then(() => {
          console.log('tables successfully populated');
          process.exit(0);
        }).catch(error => handleDBError(error));
      }).catch(error => handleDBError(error));
    }).catch(error => handleDBError(error));
  })
  .catch(error => handleDBError(error));
