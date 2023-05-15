import { Router } from 'express';
import UserController from '../controllers/user.controllers';
import loginValidate from '../middlewares/login.middleware';
import fieldsValidate from '../middlewares/fields.middleware';

const userRouter = Router();

const userController = new UserController();

userRouter.post('/', fieldsValidate, loginValidate, userController.getUserLogin);

export default userRouter;
