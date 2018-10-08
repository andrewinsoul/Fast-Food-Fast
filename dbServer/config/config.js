/* eslint-disable import/no-mutable-exports */
/* This scripts uses credentials based on
the environment variable to connect to the database */
import pg from 'pg';
import dbCredential from '../db/dbCredential';

const env = process.env.NODE_ENV || 'development';
let config;

if (env === 'development') {
  config = new pg.Client(dbCredential[env]);
} else if (env === 'test') {
  config = new pg.Client(dbCredential[env].DB_TEST);
} else {
  config = new pg.Client(dbCredential[env].DB_URL);
}

config.connect()
  .then(() => console.log('database successfully connected'))
  .catch(error => console.log({ error }));
export default config;
