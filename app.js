import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import userRouter from './dbServer/router/userRouter';
import menuRouter from './dbServer/router/menuRouter';
import orderRouter from './dbServer/router/orderRouter';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/', userRouter);
app.use('/api/v1', menuRouter);
app.use('/api/v1', orderRouter);
app.get('/', (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'welcome to fast food fast API'
  });
});
const port = parseInt(process.env.PORT, 10) || 8000;

app.listen(port, () => console.log(`server live on port ${port}`));
export default app;
