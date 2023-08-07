import expres from 'express';
import { createProject, deleteProject, getProject, getProjects, updateProject } from '../controller/projectController.js';
import { verifyUser } from '../controller/utils/verifyToken.js';


const router = expres.Router();

router.post('/createProject/:userId', verifyUser,createProject);
router.get('/getProjects/:userId', verifyUser, getProjects);
router.get('/getProject/:projectId', verifyUser, getProject);
router.put('/updateProject/:projectId', updateProject);
router.delete('/deleteProject/:projectId',  deleteProject);
export default router;