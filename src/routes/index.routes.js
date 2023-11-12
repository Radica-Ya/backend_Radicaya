import {Router} from 'express';

import { pig } from '../controllers/index.controller.js'


const router = Router();

router.get('/pig', pig );



 export default router;



