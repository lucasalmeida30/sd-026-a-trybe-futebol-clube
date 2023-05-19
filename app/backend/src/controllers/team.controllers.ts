import { Request, Response } from 'express';
import TeamService from '../services/team.services';

export default class TeamController {
  public static async findAll(_req: Request, res: Response): Promise<Response> {
    const teams = await TeamService.findAll();
    if (!teams) {
      return res.status(404).json({ message: 'teams nao encontrado' });
    }
    return res.status(200).json(teams);
  }

  public static async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team = await TeamService.findById(+id);
    if (!team) {
      return res.status(404).json({ message: 'teams nao encontrado' });
    }
    return res.status(200).json(team);
  }
}
