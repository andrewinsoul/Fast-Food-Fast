import express from 'express';
import user from '../controllers/user';
import validation from '../middlewares/validation';

const userRouter = express.Router();

userRouter
  .post('/auth/admin/signup', validation.signupMiddleware, user.signupUser)
  .post('/auth/signup', validation.signupMiddleware, user.signupUser);

export default userRouter;
