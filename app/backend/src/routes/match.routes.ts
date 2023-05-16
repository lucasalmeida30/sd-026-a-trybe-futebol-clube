import { Router } from 'express';
import MatchController from '../controllers/match.controllers';
import validateTokenMiddleware from '../middlewares/validateToken.middleware';

const matchRouter = Router();

matchRouter.get('/', MatchController.getAll);

matchRouter.patch('/:id/finish', validateTokenMiddleware, MatchController.changeMatch);

export default matchRouter;
