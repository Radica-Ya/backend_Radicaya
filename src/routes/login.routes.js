import {Router} from 'express';
import multer from 'multer';
//requerimos las funciones del controlador
import { ObtenerUsuarios, InsertarUsuarios, IngresarLogin, EliminarUsuario,  } from '../controllers/login.controllers.js';

import { RegistrarFormulario,  } from '../controllers/formulario.controllers.js';
const router = Router();

const storage = multer.memoryStorage(); // Almacena el archivo en memoria, puedes ajustarlo según tus necesidades
const upload = multer({ storage: storage });

router.get('/user', ObtenerUsuarios )

router.post('/registro', InsertarUsuarios)

router.post('/login', IngresarLogin)

router.delete('/delete/:id', EliminarUsuario)

router.post('/formulario', upload.single('documentoPDF'), RegistrarFormulario);

//router.post('/formulario', RegistrarFormulario)


router.options('/user',(req,res)=>{
    return res.status(500).json({"message":"Ruta no valida(OPTIOS)"})
})




export default router;










