import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoard.services';

export default class LeaderBoardController {
  public static async rankingTeams(_req: Request, res: Response) {
    const resultTeams = await LeaderBoardService.getTeams();
    if (!resultTeams) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(resultTeams.status).json(resultTeams.message);
  }
}
