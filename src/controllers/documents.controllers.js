import { pool } from '../db.js';
import fs from 'fs';
import path from 'path';
import moment from 'moment';

export const RegisterDocuments = async (req, res) => {
    try {
        const { dependence, date, notes, user_id } = req.body
        const { document1, document2 } = req.files

        const fileName1 = document1 ? document1[0]?.filename : null;
        const fileName2 = document2 ? document2[0]?.filename : null;

        const code = generarCodigoUnico(7);

        const [rows] = await pool.query('INSERT INTO documentos (codigo,id_usuario,id_dependencia, fecha_solicitud, asunto, archivo, archivo_2, id_estado) VALUES(?,?,?,?,?,?,?,?)',
            [code, user_id, dependence, date, notes, fileName1, fileName2, 1])

        if (rows) {
            res.status(200).json({ result: true, message: 'Documento creado exitosamente' });
        } else {
            res.status(500).json({ result: false, message: 'No se pudo registrar el documento' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: 'No se pudo registrar el documento' });
    }
};

export const EditDocuments = async (req, res) => {
    try {
        const { id, dependence, date, notes, user_id } = req.body;
        const document1 = req.files?.document1 || req.body?.document1;
        const document2 = req.files?.document2 || req.body?.document2;

        const fileName1 = document1 ? (document1[0]?.filename || document1) : null;
        const fileName2 = document2 ? (document2[0]?.filename || document2) : null;

        const [rows] = await pool.query('UPDATE documentos SET id_usuario = ?, id_dependencia = ?, fecha_solicitud = ?, asunto = ?, archivo = ?, archivo_2 = ? WHERE id = ?',
            [
                user_id, 
                dependence, 
                date, 
                notes, 
                fileName1, 
                fileName2, 
                id
            ]);

        if (rows) {
            res.status(200).json({ result: true, message: 'Documento actualizado exitosamente' });
        } else {
            res.status(500).json({ result: false, message: 'No se pudo actualizar el documento o no existe' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: 'No se pudo actualizar el documento' });
    }
}

export const ResponseRequest = async (req, res) => {
    try {
        const { mensaje, id_usuario, id_documento } = req.body

        const code = generarCodigoUnico(7);

        const date = moment().format('YYYY-MM-DD');

        const [rows] = await pool.query('INSERT INTO respuestas (codigo_res,id_usuario,id_documento, fecha_res, mensaje) VALUES(?,?,?,?,?)',
            [code, id_usuario, id_documento, date, mensaje])

        if (rows.affectedRows > 0) {
            await pool.query(
                'UPDATE documentos SET id_estado = 2 WHERE id = ?',
                [id_documento]
            );

            res.status(200).json({ result: true, message: 'Solicitud creado y actualizado exitosamente' });
        } else {
            res.status(500).json({ result: false, message: 'No se pudo registrar la solicitud' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: 'No se pudo registrar la solicitud' });
    }
};

export const GetDocumentsById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT documentos.*, respuestas.codigo_res, respuestas.fecha_res, respuestas.mensaje, users.nombre, dependencias.nombre AS nombre_dependencia, estado.nombre AS nombre_estado FROM documentos INNER JOIN dependencias ON documentos.id_dependencia = dependencias.id INNER JOIN estado ON documentos.id_estado = estado.id LEFT JOIN respuestas ON respuestas.id_documento = documentos.id LEFT JOIN user AS users ON respuestas.id_usuario = users.id WHERE documentos.id_usuario = ?', [req.params.id])

        if (rows) {
            res.status(200).json({ result: true, data: rows });
        } else {
            res.status(500).json({ result: false, message: 'No se pudo obtener la lista' });
        }
    } catch (error) {
        return res.status(500).json({ "message": "¡Algo esta mal!" })
    }
}

export const GetListDocuments = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT documentos.*, respuestas.mensaje, respuestas.codigo_res, dependencias.nombre AS nombre_dependencia, estado.nombre AS nombre_estado, users.nombre AS nombre_usuario, users.email AS email_usuario FROM documentos INNER JOIN dependencias ON documentos.id_dependencia = dependencias.id INNER JOIN estado ON documentos.id_estado = estado.id LEFT JOIN user AS users ON documentos.id_usuario = users.id LEFT JOIN respuestas ON respuestas.id_documento = documentos.id')

        if (rows) {
            res.status(200).json({ result: true, data: rows });
        } else {
            res.status(500).json({ result: false, message: 'No se pudo obtener la lista' });
        }
    } catch (error) {
        return res.status(500).json({ "message": "¡Algo esta mal!" })
    }
}

export const DownloadDocument = async (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.resolve('./uploads', filename);

        if (fs.existsSync(filePath)) {
            res.download(filePath);
        } else {
            res.status(404).json({ result: false, message: 'Archivo no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ "message": "¡Algo esta mal!" })
    }
}


function generarCodigoUnico(longitud) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    const caracteresUsados = new Set();

    while (codigo.length < longitud) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        const caracter = caracteres[indiceAleatorio];

        if (!caracteresUsados.has(caracter)) {
            caracteresUsados.add(caracter);
            codigo += caracter;
        }
    }

    return codigo;
}

