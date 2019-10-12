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
  config = new pg.Client(dbCredential[env].DB_URL);
} else {
  config = new pg.Client(dbCredential[env].DB_URL);
}

export default config;
