// routes/dataRouter.js
import express from 'express';
import datacontroler from '../controllers/datacontroler.js'; // Incluye la extensión .js

const router = express.Router();

// Ruta para obtener todos los libros
router.get('/libros', datacontroler.getLibros);

export default router;

