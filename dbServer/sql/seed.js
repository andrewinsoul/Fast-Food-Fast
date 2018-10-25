/* eslint-disable max-len */
import bcrypt from 'bcryptjs';
import config from '../config/config';

const BulkInsertUser = `
  INSERT INTO users (
    username,
    email,
    address,
    password,
    phone
) VALUES
  ( 'andypdyq',
    'mymail@gmail.com',
    'Andela Office',
    '${bcrypt.hashSync('password')}',
    '12345678654'),
    ( 'andypin',
    'mygmail@gmail.com',
    'Andela Office',
    '${bcrypt.hashSync('password')}',
    '12345678654'),
  ('slavaak',
  'slavas@gmail.com',
  'my school',
  '${bcrypt.hashSync('password')}',
  '12345678976'),
  ('constancea',
    'constance8721@gmail.com',
    'address',
    '${bcrypt.hashSync('password')}',
    '12345678987')
`;
const BulkInsertMenu = `
    INSERT INTO menu (
      food,
      category,
      price,
      description,
      userId
    ) VALUES
      ( 'Indomie and Fried Plantain',
        'Fast Food',
        2000,
        'A plate of this delicious meal cost 2000 with a bottle of chilled softdrink and six slices of fried plantain',
        1),
      ('Pepsi and Burger',
        'Junks',
        3000,
        'Enjoy a special treat of delicious burger steak and a bottle of chilled Pepsi drink all for an awesome price of 3000',
        1),
      ('Akara and Pap',
        'local',
        1200,
        'Enjoy properly fried akara balls and pap to complement it all at a whopping price of 1200',
        1)
`;
let arrayOrders1 = `[
  {"food": "Akara and Pap", "category":"local", "price":1200, "total":4800, "quantity":4},
  {"food":"Pepsi and Burger","category":"Junks","price":3000,"total":3000,"quantity": 1}
]`;
let arrayOrders2 = `[
  {"food": "Indomie and Fried Plantain", "category": "Fast Food", "price": 2000,"total": 8000,"quantity": 4},
  {"food":"Pepsi and Burger","category":"Junks","price":3000,"total":3000,"quantity": 1}

]`;
arrayOrders1 = JSON.parse(arrayOrders1);
arrayOrders2 = JSON.parse(arrayOrders2);
const InsertOrder = `
    INSERT INTO cart (
      orders,
      status,
      userId,
      createdAt
    ) VALUES ($1, $2, $3, $4)`;
config.query(BulkInsertUser).then(() => {
  config.query(BulkInsertMenu).then(() => {
    config.query(InsertOrder, [
      arrayOrders1,
      'new',
      4,
      new Date(Date.now())
    ]).then(() => {
      config.query(InsertOrder, [
        arrayOrders2,
        'cancelled',
        4,
        new Date(Date.now())
      ]).then(() => {
        console.log('tables successfully populated');
        process.exit(0);
      });
    });
  });
}).catch((error) => {
  console.log(error);
  process.exit(1);
});
