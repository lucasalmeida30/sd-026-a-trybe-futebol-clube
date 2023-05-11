import { Router } from 'express';
import TeamController from '../controllers/team.controllers';

const router = Router();

const teamsController = new TeamController();

router.get('/', teamsController.findAll);

export default router;
