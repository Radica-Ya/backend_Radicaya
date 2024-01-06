import { pool } from '../db.js'


export const RegistrarFormulario = async (peticion, respuesta) => {
  try {
    const { nombre, fechaRadicacion, dependencia, asunto, documentoPDF } = peticion.body;

    // Insertar el documento en la base de datos
    const [filas] = await pool.query('INSERT INTO Documentos (nombre, fechaRadicacion, dependencia, asunto, documentoPDF) VALUES (?, ?, ?, ?)', [nombre, fechaRadicacion, dependencia, asunto, documentoPDF]);

    respuesta.send({
      message: 'Documento registrado con éxito',
      id: filas.insertId,
      nombre,
      fechaRadicacion,
      dependencia,
      asunto,
      documentoPDF,
    });
  } catch (error) {
    console.error(error);
    return respuesta.status(500).json({ message: '¡Algo salió mal al registrar el documento!' });
  }
};
