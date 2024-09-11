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

router.post("/registro", async (req, res) => {
    const { nombre, contraseña, documento, correo, rol } = req.body;
    console.log('holaaaaaaaaaaaaaa');
    try {

        const subirnombre = await data.query("INSERT INTO usuario (nombre, contraseña, documento, correo, rol) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [nombre, contraseña, documento, correo, rol]);

        console.log(subirnombre);
        res.json(subirnombre);
    } catch (error) {
        console.error("Error al agregar usuario:", error);
        res.status(500).json({ error: "Error al agregar usuario" });
    }
});

router.post("/register", async (req, res) => {
    const { nombre, contraseña, documento, correo, rol } = req.body;
    console.log('holaaaaaaaaaaaaaa');
    try {

        const subirnombre = await data.query("INSERT INTO usuario (nombre, contraseña, documento, correo, rol) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [nombre, contraseña, documento, correo, rol]);

        console.log(subirnombre);
        res.json(subirnombre);
    } catch (error) {
        console.error("Error al agregar usuario:", error);
        res.status(500).json({ error: "Error al agregar usuario" });
    }
});


export default router;
