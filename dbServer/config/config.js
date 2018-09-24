/* This scripts uses credentials based on
the environment variable to connect to the database */
import pg from 'pg';
import dbCredential from '../db/dbCredential';

const env = process.env.NODE_ENV || 'development';

const config = new pg.Client(dbCredential[env]);
config.connect()
  .then(() => console.log('database successfully connected'))
  .catch(error => console.log({ error }));
export default config;
