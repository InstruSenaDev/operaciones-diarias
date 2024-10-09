import express from "express";
import {
  createUser,
  getAllUsers,
  getAllRecords,
  createRecord,
  loginUser,
} from "../controllers/datacontroles.js";

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post("/register", createUser);

router.post("/login", loginUser);

// Ruta para obtener todos los usuarios
router.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", detalles: error.message });
  }
});

// Ruta para obtener todas las operaciones del libro
router.get("/records", async (req, res) => {
  try {
    const records = await getAllRecords();
    res.json(records);
  } catch (error) {
    console.error("Error al obtener registros del libro:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", detalles: error.message });
  }
});

// Ruta para registrar una nueva operación en el libro
router.post("/records", async (req, res) => {
  const { fecha, tipo, descripcion, monto, numeroRecibo, idUsuario } = req.body; // Incluyendo id_usuario
  try {
    const newRecord = await createRecord({
      fecha,
      tipo,
      descripcion,
      monto,
      numeroRecibo,
      idUsuario,
    });
    res.json(newRecord);
  } catch (error) {
    console.error("Error al agregar operación en el libro:", error);
    res
      .status(500)
      .json({ error: "Error al agregar operación", detalles: error.message });
  }
});

export default router;
