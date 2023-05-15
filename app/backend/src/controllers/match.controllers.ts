import { Request, Response } from 'express';
import MatchService from '../services/matches.services';

class MatchController {
  public static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const matchesInProgress = await MatchService
        .getByInProgress(inProgress === 'true');
      return res.status(200).json(matchesInProgress);
    }
    const matches = await MatchService.getAll();
    return res.status(200).json(matches);
  }
}

export default MatchController;
