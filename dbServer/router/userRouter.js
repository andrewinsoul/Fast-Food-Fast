import express from 'express';
import user from '../controllers/user';
import userValidation from '../middlewares/userValidation';

const userRouter = express.Router();

userRouter
  .post('/auth/admin/signup',
    userValidation.signupMiddleware,
    user.signupUser)
  .post('/auth/signup',
    userValidation.signupMiddleware,
    user.signupUser)
  .post('/auth/login',
    userValidation.loginMiddleware,
    user.loginUser);

export default userRouter;
