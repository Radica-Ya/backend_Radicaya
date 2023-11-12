import { pool } from '../db.js'


//traer todos los empleados de una base de datos
export const GetEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee')
        //console.log(employees[0])
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ "message": "¡Algo esta mal!" })
    }
}

//buscar un solo empleado
export const GetEmployeesById = async (req, res) => {
    try {
        req.params.id
        const [rows] = await pool.query('SELECT * FROM employee WHERE id =?', [req.params.id])
        //console.log(employees[0])
        if (rows.length <= 0) {
            return res.status(404).json({ "message": "el cliente que busco no se encuetra en nustros registros" })
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        return res.status(500).json({ "message": "¡Algo esta mal!" })
    }
}


//Crear nuevo empleado 
export const CreateEmployees = async (req, res) => {
    try {
        const { name, apellido, edad } = req.body
        const [rows] = await pool.query('INSERT INTO employee (name,apellido,edad) VALUES(?,?,?)', [name, apellido, edad])
        console.log(rows)
        res.send({
            "mesagee": "empleado registrado con exito",
            "id": rows.insertId,
            name,
            apellido, edad
        })
    } catch (error) {
        return res.status(500).json({ "message": "¡Algo esta mal!" })
    }
}

//editar empleados
export const UpdateEmployees = async (req, res) => {
    try {
        const { id } = req.params
        const { name, apellido, edad } = req.body

        const [result] = await pool.query('UPDATE employee SET name= IFNULL(?, name),apellido=IFNULL(?, apellido),edad=IFNULL(?, edad) WHERE id=?', [name, apellido, edad, id])
        console.log(result)
        if (result.affectedRows >= 1) {
            return res.json({ "menssage": "empleado actualizado con exito" })

        } else {
            return res.json({ "menssage": "el empleado que intentas actualizar no existe" })
        }
    } catch (error) {
        return res.status(500).json({ "message": "¡Algo esta mal!" })
    }
}

//eliminar empleados de una base de datos 
export const DeleteEmployees = async (req, res) => {
    try {
        const response = await pool.query('DELETE FROM employee WHERE id=?', [req.params.id])

        if (response[0].affectedRows >= 1) {
            return res.json({ "message": "empleado eliminado con exito" });
        } else {
            return res.json({ "message": "el empleado no existe" });
        }
    } catch (error) {
        return res.status(500).json({ "message": "¡Algo esta mal!" })
    }
}













