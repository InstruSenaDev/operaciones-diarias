import express from 'express';
import { register } from '../controllers/datacontroles.js';

const router = express.Router();

// Ruta para obtener todas las personas
router.get('/usuario', async (req, res) => {
    try {
        const usuario = await getAllUsuario();
        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener personas:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Ruta para registrar una nueva persona
router.post('/register', async (req, res) => {
    try {
        console.log('Datos recibidos en la solicitud de registro:', req.body);
        const { nombre, contraseña, documento, correo, rol } = req.body;
        const newPerson = await register({ nombre, contraseña, documento, correo, rol });
        res.status(201).json(newPerson);
    } catch (error) {
        console.error('Error al registrar persona:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

export default router;
