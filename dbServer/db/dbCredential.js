import dotenv from 'dotenv';

dotenv.config();
const dbCredential = {
  development: {
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
  test: {
    DB_URL: process.env.DB_TEST
  }
};
export default dbCredential;
