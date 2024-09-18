import express from "express";
import { registerUsuario, getAllUsuarios, getAllOperaciones, registerOperacion } from "../controllers/datacontroles.js";

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/usuario", async (req, res) => {
  try {
    const usuarios = await getAllUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor", detalles: error.message });
  }
});

// Ruta para registrar un nuevo usuario
router.post("/register", async (req, res) => {
  const { nombre, contraseña, documento, correo, rol } = req.body;
  try {
    const nuevoUsuario = await registerUsuario({ nombre, contraseña, documento, correo, rol });
    res.json(nuevoUsuario);
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    res.status(500).json({ error: "Error al agregar usuario", detalles: error.message });
  }
});

// Ruta para obtener todas las operaciones
router.get("/operaciones", async (req, res) => {
  try {
    const operaciones = await getAllOperaciones();
    res.json(operaciones);
  } catch (error) {
    console.error("Error al obtener operaciones:", error);
    res.status(500).json({ error: "Error interno del servidor", detalles: error.message });
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
    res.status(500).json({ error: "Error al agregar operación", detalles: error.message });
  }
});

export default router;
