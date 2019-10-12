import express from 'express';
import menu from '../controllers/menu';
import validation from '../middlewares/validation';
import verifyToken from '../middlewares/helperFunctions/verifyToken';
import verifyAdmin from '../middlewares/helperFunctions/verifyAdmin';

const menuRouter = express.Router();

menuRouter
  .post('/menu',
    verifyToken,
    verifyAdmin,
    validation.createMenu,
    menu.createMenu)
  .get('/menu',
    verifyToken,
    menu.getMenuByCategory,
    menu.getAvailableMenu)
  .get('/search',
    verifyToken,
    menu.searchMenuByName,
    menu.searchMenuByCategory);

export default menuRouter;
