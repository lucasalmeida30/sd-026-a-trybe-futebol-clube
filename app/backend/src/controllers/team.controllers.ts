import { Request, Response } from 'express';
import TeamService from '../services/team.services';

export default class TeamController {
  constructor(private _teamController = new TeamService()) {
    this.findAll = this.findAll.bind(this);
  }

  async findAll(_req: Request, res: Response): Promise<Response> {
    const teams = await this._teamController.findAll();
    if (!teams) {
      return res.status(404).json({ message: 'teams nao encontrado' });
    }
    return res.status(200).json(teams);
  }
}
