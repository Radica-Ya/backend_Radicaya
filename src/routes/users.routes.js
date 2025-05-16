import { Router } from 'express';
import { GetListUsers } from '../controllers/users.controllers.js';

const router = Router();

router.get('/list-users', GetListUsers)

export default router