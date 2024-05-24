import { Router } from 'express';
import { login, signUp } from '../controllers/user';
const router = Router();

router.post('/register', signUp);
router.post('/login', login);

export default router;
