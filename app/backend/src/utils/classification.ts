import ILeaderboard from '../interfaces/ILeaderboard';

const classification = (): ILeaderboard => {
  const obj = {
    totalPoints: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
  };
  return obj as ILeaderboard;
};

export default classification;
