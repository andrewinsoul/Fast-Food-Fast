import config from '../config/config';
import user from './models/user';
import menu from './models/menu';
import cart from './models/cart';

config.query(user).then(() => {
  config.query(menu).then(() => {
    config.query(cart).then(() => {
      console.log('tables created successfully');
      process.exit(0);
    });
  });
}).catch((error) => {
  console.log(error);
  process.exit(1);
});
