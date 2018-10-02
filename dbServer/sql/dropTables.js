import config from '../config/config';

const user = 'drop table if exists users cascade';
const menu = 'drop table if exists menu cascade';
const cart = 'drop table if exists cart';

config.query(user)
  .then(() => {
    config.query(menu)
      .then(() => {
        config.query(cart)
          .then(() => {
            console.log('tables successfully dropped');
            process.exit(0);
          });
      });
  }).catch((error) => {
    console.log(error);
    process.exit(1);
  });
