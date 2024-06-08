import { Router } from 'express';
import UserRoute from './user-routes';
import AuthRoute from './auth';
import Auth from '../middleware';

const router = Router();

router.use('/users', Auth, UserRoute);
router.use('/auth', AuthRoute);

// only for Render use
router.use('/node-cron', UserRoute);

export default router;
