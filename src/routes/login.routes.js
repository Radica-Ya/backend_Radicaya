import { Router } from 'express';
import { InsertarUsuarios, IngresarLogin, } from '../controllers/login.controllers.js';

const router = Router();

router.post('/registro', InsertarUsuarios)

router.post('/login', IngresarLogin)

export default router;










