import { pool } from '../db.js';


export const GetListUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT users.*, roles.nombre as rol FROM user as users INNER JOIN roles where roles.id = users.id_rol')

        if (rows) {
            res.status(200).json({ result: true, data: rows });
        } else {
            res.status(500).json({ result: false, message: 'No se pudo obtener la lista' });
        }
    } catch (error) {
        return res.status(500).json({ "message": "¡Algo esta mal!" })
    }
}

export const changeRoleUser = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query('UPDATE user SET id_rol = 1 WHERE id = ?', [id]);

        if (rows.affectedRows > 0) {
            res.status(200).json({ result: true, message: 'Rol actualizado correctamente' });
        } else {
            res.status(404).json({ result: false, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ "message": "¡Algo esta mal!" })
    }
}