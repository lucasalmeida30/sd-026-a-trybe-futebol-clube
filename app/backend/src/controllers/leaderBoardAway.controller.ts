import { Request, Response } from 'express';
import LeaderBoardServiceAway from '../services/leaderBoardAway.services';

export default class LeaderBoardControllerAway {
  public static async rankingTeams(_req: Request, res: Response) {
    const resultTeams = await LeaderBoardServiceAway.getTeams();
    if (!resultTeams) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(resultTeams.status).json(resultTeams.message);
  }
}
