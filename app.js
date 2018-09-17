import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import orderRouter from './server/routes/orderRouter';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', orderRouter);

const port = parseInt(process.env.PORT, 10) || 8000;

app.listen(port, () => console.log(`server live on port ${port}`));
export default app;
