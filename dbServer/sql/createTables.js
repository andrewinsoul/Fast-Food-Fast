import config from '../config/config';
import user from './models/user';
import menu from './models/menu';
import cart from './models/cart';

let query = config.query(user);
query.then(() => {
  console.log('users table successfully created');
}).then(() => {
  query = config.query(menu);
}).then(() => {
  query = config.query(cart);
}).then(() => {
  console.log('menu table successfully created');
  console.log('cart table successfully created');
  process.exit(0);
})
  .catch(error => console.log(error));
