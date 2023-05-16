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

  public static async changeMatch(id: number) {
    const match = await MatchModel.findByPk(id);
    await match?.update(
      {
        inProgress: false,
      },
      {
        where: { id },
      },
    );
    return { type: null, message: 'Finished' };
  }

  public static async updateMatches(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const match = await MatchModel.findByPk(id);
    await match?.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    match?.save();
    return { type: null, message: 'Update sucess' };
  }
}
export default MatchService;
