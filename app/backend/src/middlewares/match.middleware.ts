import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/team.services';

const validateNewMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  const teamHome = await TeamService.findById(homeTeamId);
  const teamAway = await TeamService.findById(awayTeamId);
  if (!teamHome || !teamAway) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  return next();
};

export default validateNewMatch;
