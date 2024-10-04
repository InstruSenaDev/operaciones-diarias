import express from "express";
import { createUser, getAllUsers, getAllRecords, createRecord } from "../controllers/datacontroles.js";

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor", detalles: error.message });
  }
});

// Ruta para registrar un nuevo usuario
router.post("/users", async (req, res) => {
  const { nombre, contraseña, documento, correo, rol } = req.body;
  try {
    const newUser = await createUser({ nombre, contraseña, documento, correo, rol });
    res.json(newUser);
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    res.status(500).json({ error: "Error al agregar usuario", detalles: error.message });
  }
});

// Ruta para obtener todas las operaciones del libro
router.get("/records", async (req, res) => {
  try {
    const records = await getAllRecords();
    res.json(records);
  } catch (error) {
    console.error("Error al obtener registros del libro:", error);
    res.status(500).json({ error: "Error interno del servidor", detalles: error.message });
  }
});

// Ruta para registrar una nueva operación en el libro
router.post("/records", async (req, res) => {
  const { fecha, tipo, descripcion, monto, numeroRecibo } = req.body;
  try {
    const newRecord = await createRecord({ fecha, tipo, descripcion, monto, numeroRecibo });
    res.json(newRecord);
  } catch (error) {
    console.error("Error al agregar operación en el libro:", error);
    res.status(500).json({ error: "Error al agregar operación", detalles: error.message });
  }
});

export default router;
