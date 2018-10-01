import config from '../config/config';
import user from './models/user';
import menu from './models/menu';
import cart from './models/cart';

let query = config.query(user);
query.then(() => {
  console.log('users table successfully created');
}).then(() => {
  query = config.query(menu);
  console.log('menu table successfully created');
}).then(() => {
  query = config.query(cart);
  console.log('cart table successfully created ');
}).then(() => process.exit(0))
  .catch(error => console.log(error));
