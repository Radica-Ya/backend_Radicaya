import { pool } from '../db.js'
import bcryptjs from 'bcryptjs'


//traer todos los empleados de una base de datos
export const ObtenerUsuarios = async (peticion, respuesta) => {
    try {
        const [filas] = await pool.query('SELECT * FROM user')
        //console.log(employees[0])
        respuesta.json(filas);
    } catch (error) {
        return res.status(500).json({ "message": "¡Algo esta mal!" })
    }
}

export const InsertarUsuarios = async (peticion, respuesta) => {
    try {
        const { nombre, email, telefono, contrasena } = peticion.body

        const [validarUsuario] = await pool.query('SELECT * FROM user WHERE telefono = ?', [telefono]);

        if (validarUsuario.length > 0) {
            return respuesta.status(400).json({ "message": "El usuario a insertar ya existe"})
        }

        const contrasenaEcriptada = await bcryptjs.hash(contrasena, 8);
        const [filas] = await pool.query('INSERT INTO user (nombre, email, telefono, contrasena) VALUES(?,?,?,?)', [nombre, email, telefono, contrasenaEcriptada])

        console.log(filas)
        respuesta.send({
            "message": "empleado registrado con exito",
            "id": filas.insertId,
            nombre,
            email
            
        })
    } catch (error) {
        console.log(error)
        return respuesta.status(500).json({ "message": "¡Algo esta mal!" })
    }
}

export const IngresarLogin = async (peticion, respuesta) => {
    try {
        const { nombre, contrasena } = peticion.body;

        const [filas] = await pool.query('SELECT * FROM user WHERE nombre = ?', [nombre]);

        if (filas.length === 0) {
            return respuesta.status(401).json({ "message": "Usuario o contraseña incorrectos" });
        }

        const contrasenaCorrecta = await bcryptjs.compare(contrasena, filas[0].contrasena);

        if (contrasenaCorrecta) {
            respuesta.send({ "message": "Inicio de sesión exitoso", nombre, contrasenaCorrecta});
        } else {
            respuesta.status(401).json({ "message": "contraseña incorrectos" });
        }
    } catch (error) {
        console.log(error);
        return respuesta.status(500).json({ "message": "¡Algo está mal!" });
    }
};

/*export const IngresarLogin = async (peticion, respuesta) => {
    try {
        const { nombre, contrasena} = peticion.body
        const contrasenaEcriptada = await bcryptjs.hash(contrasena, 8);
        if (nombre, contrasena){
        const [filas] = await pool.query('SELECT * FROM user WHERE nombre = ?', [nombre], async (error, results)=> {
            console.log(results)
            if(results.lenght == 0 || !(await bcryptjs.compare(contrasena, results[0].contrasena)))

            console.log(filas)
            respuesta.send({
                "message": "Ingreso Exitoso",
            })
        })}
    } catch (error) {
        return respuesta.status(500).json({ "message": "¡Algo esta mal!"})
    }
}*/
