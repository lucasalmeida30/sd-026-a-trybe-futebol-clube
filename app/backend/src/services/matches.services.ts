import TeamModel from '../database/models/team';
import MatchModel from '../database/models/matche';

class MatchService {
  public static async getAll(): Promise<MatchModel[]> {
    const matches = await MatchModel.findAll({
      include: [
        {
          model: TeamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        }],
    });
    return matches;
  }

  public static async getByInProgress(query: boolean) {
    const matches = await MatchModel.findAll({
      where: {
        inProgress: query,
      },
      include: [
        {
          model: TeamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }
}

export default MatchService;