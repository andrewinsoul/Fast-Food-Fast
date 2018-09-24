import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import config from './dbServer/config/config';
import user from './dbServer/sql/models/user';
import menu from './dbServer/sql/models/menu';
import cart from './dbServer/sql/models/cart';
import userRouter from './dbServer/router/userRouter';

let query = config.query(user);
query.then(() => {
  console.log('users table successfully created');
}).then(() => {
  query = config.query(menu);
  console.log('menu table successfully created');
}).then(() => {
  query = config.query(cart);
  console.log('cart table successfully created ');
}).catch(error => console.log(error));
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', userRouter);
app.get('/', (req, res) => {
  res.status(200).send({ message: 'welcome to FastFoodFast API' });
});
const port = parseInt(process.env.PORT, 10) || 8000;

app.listen(port, () => console.log(`server live on port ${port}`));
export default app;
