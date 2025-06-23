import { Router } from 'express';
import { GetListUsers, changeRoleUser } from '../controllers/users.controllers.js';

const router = Router();

router.get('/list-users', GetListUsers)
router.put('/change-rol/:id', changeRoleUser)

export default router