import { Router } from 'express';
import UserController from '../controllers/user.controllers';

const userRouter = Router();

const userController = new UserController();

userRouter.post('/', userController.getUserLogin);

export default userRouter;
