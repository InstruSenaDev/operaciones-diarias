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



router.post("/register", async (req, res) => {
    const {nombre, contraseña, documento, correo, rol  } = req.body;

    try {
        
     

        const subirnombre = await data.query("INSERT INTO usuario (nombre, contraseña, documento, correo, rol) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [nombre, contraseña, documento, correo, rol ]);

        console.log(subirnombre);
        res.json(subirnombre);
    } catch (error) {
        console.error("Error al agregar usuario:", error);
        res.status(500).json({ error: "Error al agregar usuario" });
    }
});

// Ruta para obtener todas las operaciones
router.get('/operaciones', async (req, res) => {
    try {
      const operaciones = await getAllOperaciones();
      res.json(operaciones);
    } catch (error) {
      console.error('Error al obtener operaciones:', error);
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
  });
  
  // Ruta para registrar una nueva operación
  router.post("/operaciones", async (req, res) => {
    const { fecha, tipo, descripcion, monto, numeroRecibo } = req.body;
  
    try {
      const nuevaOperacion = await registerOperacion({ fecha, tipo, descripcion, monto, numeroRecibo });
      res.json(nuevaOperacion);
    } catch (error) {
      console.error("Error al agregar operación:", error);
      res.status(500).json({ error: "Error al agregar operación" });
    }
  });

export default router;
