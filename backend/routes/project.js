import expres from 'express';
import { createProject, getProject, getProjects } from '../controller/projectController.js';
import { verifyUser } from '../controller/utils/verifyToken.js';


const router = expres.Router();

router.post('/createProject/:userId', verifyUser,createProject);
router.get('/getProjects/:userId', verifyUser, getProjects);
router.get('/getProject/:projectId', verifyUser, getProject);
export default router;