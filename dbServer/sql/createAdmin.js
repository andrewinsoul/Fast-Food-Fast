import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import config from '../config/config';

dotenv.load();

const password = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8);
const insertAdmin = `
  insert into users(
    username,
    email,
    address,
    password,
    phone,
    user_role
  ) values(
    '${process.env.ADMIN_USERNAME}',
    '${process.env.ADMIN_EMAIL}',
    'Andela Office',
    '${password}',
    '12345678906',
    ${true}
  )
`;

config.query(insertAdmin).then(() => {
  process.exit(0);
}).catch((error) => {
  console.log(error);
  process.exit(1);
});
