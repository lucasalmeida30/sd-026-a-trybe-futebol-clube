import ITeam from '../interfaces/ITeam';
import TeamModel from '../database/models/team';

class TeamService {
  public static async findAll(): Promise<ITeam[]> {
    const teams = await TeamModel.findAll();
    return teams;
  }

  public static async findById(id: number): Promise<ITeam> {
    const team = await TeamModel.findByPk(id);
    return team as ITeam;
  }
}
export default TeamService;
