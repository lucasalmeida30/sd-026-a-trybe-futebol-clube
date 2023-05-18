import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderBoard.controller';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', LeaderBoardController.rankingTeams);

export default leaderBoardRouter;
