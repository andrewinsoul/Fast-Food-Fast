import config from '../config/config';

const user = 'drop table if exists users cascade';
const menu = 'drop table if exists menu cascade';
const cart = 'drop table if exists cart';

let query = config.query(user);
query.then(() => {
  console.log('users table successfully dropped');
}).then(() => {
  query = config.query(menu);
  console.log('cart table successfully dropped');
}).then(() => {
  query = config.query(cart);
  console.log('menu table successfully dropped');
}).then(() => {
  process.exit(0);
})
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
