import { Router } from 'express';
import MatchController from '../controllers/match.controllers';
import validateTokenMiddleware from '../middlewares/validateToken.middleware';
import validateNewMatch from '../middlewares/match.middleware';

const matchRouter = Router();

matchRouter.get('/', MatchController.getAll);

matchRouter.patch('/:id/finish', validateTokenMiddleware, MatchController.changeMatch);

matchRouter.patch('/:id', validateTokenMiddleware, MatchController.updateMatches);

matchRouter.post('/', validateTokenMiddleware, validateNewMatch, MatchController.insertMatch);

export default matchRouter;
