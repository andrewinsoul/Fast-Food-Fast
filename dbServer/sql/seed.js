import config from '../config/config';

const BulkInsertUser = `
  INSERT INTO users (
    username,
    email,
    address,
    password,
    phone
) VALUES
  ( 'andypdy',
    'andrewinsolsul@gmail.com',
    'Andela Office',
    'password',
    '12345678654'),
  ('slavaak',
  'slavacouroy05as@gmail.com',
  'my school',
  'password',
  '12345678976'),
  ('constancea',
    'chiamasdkaconswtance87@gmail.com',
    'address',
    'password',
    '12345678987')
`;
const BulkInsertMenu = `
    INSERT INTO menu (
      food,
      price,
      userId
    ) VALUES
      ( 'Indomie and Fried Plantain',
        2000,
        1),
      ('Fried Rice and Chicken',
        3000,
        1),
      ('Jollof Rice and Fried Meat',
        2500,
        1)
`;
let arrayOrders1 = `[
  {"foodId": 1, "quantity": 3},
  {"foodId": 2, "quantity": 1}
]`;
let arrayOrders2 = `[
  {"foodId": 3, "quantity": 3},
  {"foodId": 2, "quantity": 1}

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
  console.log('users table successfully populated');
}).then(() => {
  config.query(BulkInsertMenu).then(() => {
    console.log('menu table successfully populated');
  }).then(() => {
    config.query(InsertOrder, [
      arrayOrders1,
      'new',
      2,
      new Date(Date.now())
    ]).then(() => {
      config.query(InsertOrder, [
        arrayOrders2,
        'cancelled',
        3,
        new Date(Date.now())
      ]);
    }).then(() => console.log('cart table successfully populated'))
      .then(() => process.exit(0))
      .catch(error => console.log(error));
  });
});
