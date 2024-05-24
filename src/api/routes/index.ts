import {Router} from 'express';
import UserRoute from './user-routes'

const router = Router();


router.use('/users', UserRoute);

export default router;
