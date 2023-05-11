import { Request, Response } from 'express';
import TeamService from '../services/team.services';

export default class TeamController {
  constructor(private _teamController = new TeamService()) {
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
  }

  async findAll(_req: Request, res: Response): Promise<Response> {
    const teams = await this._teamController.findAll();
    if (!teams) {
      return res.status(404).json({ message: 'teams nao encontrado' });
    }
    return res.status(200).json(teams);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team = await this._teamController.findById(+id);
    if (!team) {
      return res.status(404).json({ message: 'team nao encontrado' });
    }
    return res.status(200).json(team);
  }
}
