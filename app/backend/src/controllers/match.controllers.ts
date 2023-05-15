import { Request, Response } from 'express';
import MatchService from '../services/matches.services';

class MatchController {
  public static async getAll(_req: Request, res: Response) {
    const matches = await MatchService.getAll();
    if (!matches) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json(matches);
  }
}

export default MatchController;
