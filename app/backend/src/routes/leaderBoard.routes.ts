import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderBoard.controller';
import LeaderBoardControllerAway from '../controllers/leaderBoardAway.controller';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', LeaderBoardController.rankingTeams);

leaderBoardRouter.get('/away', LeaderBoardControllerAway.rankingTeams);

export default leaderBoardRouter;
