import ITeam from '../interfaces/ITeam';
import TeamModel from '../database/models/team';

class TeamService {
  constructor(private _model = TeamModel) {}

  async findAll(): Promise<ITeam[]> {
    const teams = await this._model.findAll();
    return teams;
  }

  async findById(id: number): Promise<ITeam | null> {
    const team = await this._model.findByPk(id);
    return team;
  }
}
export default TeamService;
