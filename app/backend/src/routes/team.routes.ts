import { Router } from 'express';
import TeamController from '../controllers/team.controllers';

const router = Router();

router.get('/', TeamController.findAll);

router.get('/:id', TeamController.findById);

export default router;
