// middlewares/uploadFiles.js
import multer from 'multer';
import fs from 'fs';

// Ruta base de almacenamiento
const uploadDir = './uploads';

// Asegurarse de que la carpeta exista
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configuración general de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

// Middleware reutilizable
export const uploadDocuments = upload.fields([
    { name: 'document1', maxCount: 1 },
    { name: 'document2', maxCount: 1 },
]);
