import config from '../config';
import user from './models/user';
import menu from './models/menu';
import cart from './models/cart';
import { handleDBError } from '../utils/errorHandler';

config.connect()
  .then(() => {
    config.query(user).then(() => {
      config.query(menu).then(() => {
        config.query(cart).then(() => {
          console.log('tables created successfully');
          process.exit(0);
        }).catch(error => handleDBError(error));
      }).catch(error => handleDBError(error));
    }).catch(error => handleDBError(error));
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
