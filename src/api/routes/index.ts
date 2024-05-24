import { Router } from 'express';
import UserRoute from './user-routes';
import AuthRoute from './auth';
import Auth from '../middleware';

const router = Router();

router.use('/users', Auth, UserRoute);
router.use('/auth', AuthRoute);

export default router;
