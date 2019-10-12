import faker from 'faker';
import { encodePassword } from "../utils/passwordUtil";
import config from '../config';
import { handleDBError } from '../utils/errorHandler';

let userString = '';
for (let i = 0; i <= 30; i++) {
  const password = faker.name.firstName();
  const email = faker.internet.email();
  userString += `(
    '${faker.name.lastName() + i}',
    '${email}',
    '${faker.address.streetAddress()}',
    '${encodePassword(password)}',
    '${faker.phone.phoneNumberFormat()}'
    ),`;
  console.log(`Email ===> ${email}\n password ====> ${password}`);
}

userString = userString.slice(0, userString.length - 1);

const BulkInsertUser = `
INSERT INTO users (
  username,
  email,
  address,
  password,
  phone
) VALUES ${userString}
`;

const categories = [
  'Fries',
  'Intercontinental',
  'African',
  'Chinese',
  'Other',
  'Italian'
];
const status = ['New', 'Cancelled', 'Processing', 'Complete'];

let menuString = '';
for (let i = 0; i <= 30; i++) {
  menuString += `(
    '${faker.lorem.word() + i}',
    '${categories[faker.random.number({ min: 0, max: 5 })]}',
    ${faker.random.number({ min: 3000, max: 80000, precision: 1000 })},
    '${faker.lorem.sentences(7)}',
    1
  ),`;
}

menuString = menuString.slice(0, menuString.length - 1);
const BulkInsertMenu = `
  INSERT INTO menu (
    food,
    category,
    price,
    description,
    userId
  ) VALUES ${menuString}
`;

let orderString = '';
for (let i = 0; i <= 30; i++) {
  const menuId = faker.random.number({ min: 1, max: 30, precision: 1 });
  const userId = faker.random.number({ min: 1, max: 30, precision: 1 });
  const quantity = faker.random.number({ min: 1, max: 15, precision: 1 });
  const index = faker.random.number({ min: 0, max: 3, precision: 1 });
  orderString += `(
    ${menuId}, ${userId}, ${quantity}, '${status[index]}'
  ),`;
}
orderString = orderString.slice(0, orderString.length - 1);
const bulkInsertOrder = `
  INSERT INTO cart (
    menuId,
    userId,
    quantity,
    status
  ) VALUES ${orderString}
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
