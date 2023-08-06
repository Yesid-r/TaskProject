import expres from 'express';
import { createProject } from '../controller/projectController.js';

const router = expres.Router();

router.post('/createProject/:userId', createProject);
export default router;