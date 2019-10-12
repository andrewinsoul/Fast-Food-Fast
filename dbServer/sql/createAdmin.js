import dotenv from 'dotenv';
import { encodePassword } from "../utils/passwordUtil";
import config from '../config';
import { handleDBError } from '../utils/errorHandler';

dotenv.load();

const password = encodePassword(process.env.ADMIN_PASSWORD);
const insertAdmin = `
  INSERT INTO users(
    username,
    email,
    address,
    password,
    phone,
    user_role
  ) VALUES(
    '${process.env.ADMIN_USERNAME}',
    '${process.env.ADMIN_EMAIL}',
    'Andela Office',
    '${password}',
    '12345678906',
    ${true}
  )
`;

config.connect()
  .then(() => {
    config.query(insertAdmin).then(() => {
      console.log("Admin successfully created");
      process.exit(0);
    }).catch(error => handleDBError(error));
  })
  .catch(error => handleDBError(error));
