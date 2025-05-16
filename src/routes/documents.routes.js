import { Router } from 'express';
import { DownloadDocument, EditDocuments, GetDocumentsById, GetListDocuments, RegisterDocuments, ResponseRequest } from '../controllers/documents.controllers.js';
import { uploadDocuments } from '../middlewares/uploadFiles.js';

const router = Router();

router.post('/documents', uploadDocuments, RegisterDocuments)

router.post('/documents-edit', uploadDocuments, EditDocuments)

router.post('/response-request', ResponseRequest)

router.get('/documents-user/:id', GetDocumentsById )

router.get('/list-documents/', GetListDocuments )

router.get('/download/:filename', DownloadDocument )



export default router;










