import { Router } from 'express';
import { updateProfile } from '../controllers/user';
import * as userController from '../controllers/user';
const router = Router();

router.put('/update-profile', userController.updateProfile);
router.put('/mark-as-spam/:id', userController.markAsSpam);
router.get('/search', userController.search);
router.get('/info/:id', userController.getUserInfo);





export default router;
