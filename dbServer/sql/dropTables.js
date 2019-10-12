import config from '../config';
import { handleDBError } from '../utils/errorHandler';

const dropUserTable = 'drop table if exists users cascade';
const dropMenuTable = 'drop table if exists menu cascade';
const dropCartTable = 'drop table if exists cart';

config.connect()
  .then(() => {
    config.query(dropUserTable)
      .then(() => {
        config.query(dropMenuTable)
          .then(() => {
            config.query(dropCartTable)
              .then(() => {
                console.log('tables successfully dropped');
                process.exit(0);
              }).catch(error => handleDBError(error));
          }).catch(error => handleDBError(error));
      }).catch(error => handleDBError(error));
  }).catch((error => handleDBError(error)));
