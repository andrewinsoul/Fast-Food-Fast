import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import userRouter from './dbServer/router/userRouter';
import menuRouter from './dbServer/router/menuRouter';
import orderRouter from './dbServer/router/orderRouter';
import swaggerDocument from './swagger.json';

const app = express();
app.use(logger('dev'));
app.use('/api/v1/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With,Content-Type,Accept,Authorization, x-access-token'
  );
  next();
});
app.use('/api/v1/', userRouter);
app.use('/api/v1', menuRouter);
app.use('/api/v1', orderRouter);
app.get('/', (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'welcome to fast food fast API'
  });
});
app.all('*', (req, res) => {
  res.status(404).send({
    status: 'error',
    error: 'invalid link, not found'
  });
});
const port = parseInt(process.env.PORT, 10) || 8000;

app.listen(port, () => console.log(`server live on port ${port}`));
export default app;
