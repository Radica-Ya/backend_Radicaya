import {Router} from 'express';
//requerimos las funciones del controlador
import { ObtenerUsuarios, InsertarUsuarios, IngresarLogin, EliminarUsuario } from '../controllers/login.controllers.js';

const router = Router();

router.get('/user', ObtenerUsuarios )

router.post('/registro', InsertarUsuarios)

router.get('/login', IngresarLogin)

router.delete('/delete/:id', EliminarUsuario)


router.options('/user',(req,res)=>{
    return res.status(500).json({"message":"Ruta no valida(OPTIOS)"})
})




export default router;










