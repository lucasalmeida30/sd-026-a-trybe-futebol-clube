import { Router } from 'express';
import UserController from '../controllers/user.controllers';
import loginValidate from '../middlewares/login.middleware';
import fieldsValidate from '../middlewares/fields.middleware';
import validateTokenMiddleware from '../middlewares/validateToken,middleware';

const userRouter = Router();

const userController = new UserController();

userRouter.post('/', fieldsValidate, loginValidate, userController.getUserLogin);

userRouter.get('/role', validateTokenMiddleware, userController.getRole);

export default userRouter;
