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

  public static async changeMatch(req: Request, res: Response) {
    const { id } = req.params;
    const match = await MatchService.changeMatch(+id);
    if (!match) {
      return res.status(404).json({ message: '"Id" Not found' });
    }
    return res.status(200).json({ message: match.message });
  }
}

export default MatchController;
