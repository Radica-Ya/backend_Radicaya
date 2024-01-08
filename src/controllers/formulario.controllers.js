import { pool } from '../db.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const RegistrarFormulario = async (peticion, respuesta) => {
  try {
    const { nombre, fechaRadicacion, dependencia, asunto } = peticion.body;

    // Accede al archivo adjunto usando req.file
    const documentoPDF = peticion.file.buffer;

    // Inserta el documento en la base de datos
    const [result] = await pool.query('INSERT INTO documentos (nombre, fechaRadicacion, dependencia, asunto, documentoPDF) VALUES (?, ?, ?, ?, ?)', [nombre, fechaRadicacion, dependencia, asunto, documentoPDF]);

    console.log(result)
    respuesta.send({
      "message": "Documento registrado con exito",
      "id": result.insertId,
      nombre,
      fechaRadicacion,
      dependencia,
      asunto
    })

  } catch (error) {
    console.log(error);
    respuesta.status(500).json({ message: '¡Algo salió mal al registrar el documento!' });
  }
};

export const uploadMiddleware = upload.single('documentoPDF');


/*export const RegistrarFormulario = async (peticion, respuesta) => {
  try {
    const { nombre, fechaRadicacion, dependencia, asunto, documentoPDF } = peticion.body;

    // Insertar el documento en la base de datos
    const [filas] = await pool.query('INSERT INTO Documentos (nombre, fechaRadicacion, dependencia, asunto, documentoPDF) VALUES (?, ?, ?, ?, ?)', [nombre, fechaRadicacion, dependencia, asunto, documentoPDF]);

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
};*/

