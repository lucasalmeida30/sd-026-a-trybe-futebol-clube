import classification from '../utils/classification';
import ILeaderboard from '../interfaces/ILeaderboard';
import IMatch from '../interfaces/IMatch';
import MatchModel from '../database/models/matche';
import ITeam from '../interfaces/ITeam';
import TeamService from './team.services';

class LeaderBoardServiceAway {
  public static calculator(matches: IMatch[]): ILeaderboard {
    return matches.reduce((acc, curr) => {
      if (curr.awayTeamGoals > curr.homeTeamGoals) {
        acc.totalPoints += 3;
        acc.totalVictories += 1;
      } if (curr.homeTeamGoals > curr.awayTeamGoals) {
        acc.totalLosses += 1;
      } if (curr.homeTeamGoals === curr.awayTeamGoals) {
        acc.totalPoints += 1;
        acc.totalDraws += 1;
      }
      acc.goalsFavor += curr.homeTeamGoals;
      acc.goalsOwn += curr.awayTeamGoals;
      return acc;
    }, classification());
  }

  public static async rankingTeams(team: ITeam) {
    const matchesAway = await MatchModel.findAll({
      where: { inProgress: false, awayTeamId: team.id },
    });
    const ranking = this.calculator(matchesAway);
    const listTeams = {
      name: team.teamName,
      totalPoints: ranking.totalPoints,
      totalGames: matchesAway.length,
      totalVictories: ranking.totalVictories,
      totalDraws: ranking.totalDraws,
      totalLosses: ranking.totalLosses,
      goalsFavor: ranking.goalsFavor,
      goalsOwn: ranking.goalsOwn,
    };
    return listTeams;
  }

  public static async getTeams() {
    const teams = await TeamService.findAll();
    const result = await Promise.all(teams.map((e) => {
      const team = this.rankingTeams(e);
      return team;
    }));
    if (!result) {
      return { status: 401, message: 'Not found' };
    }
    return { status: 200, message: result };
  }
}

export default LeaderBoardServiceAway;
