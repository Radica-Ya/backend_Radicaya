import {Router} from 'express';
//requerimos las funciones del controlador
import {GetEmployees, CreateEmployees, UpdateEmployees, DeleteEmployees,GetEmployeesById} from '../controllers/employees.controllers.js'

const router = Router();

router.get('/employee', GetEmployees )

router.get('/employee/:id', GetEmployeesById )

router.post('/employee', CreateEmployees)

router.put('/employee/:id', UpdateEmployees)

router.delete('/employee/:id', DeleteEmployees)
router.options('/employee',(req,res)=>{
    return res.status(500).json({"message":"Ruta no valida(OPTIOS)"})
})




export default router;










