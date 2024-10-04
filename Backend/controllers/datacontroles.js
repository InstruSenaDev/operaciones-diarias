import { pool } from "../config/db.js";

// Obtener todos los usuarios
async function getAllUsers() {
  try {
    const result = await pool.query("SELECT * FROM usuario");  // Tabla 'usuario'
    return result.rows;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
}

// Registrar un nuevo usuario
async function createUser({ nombre, contraseña, documento, correo, rol }) {
  try {
    const result = await pool.query(
      "INSERT INTO usuario (nombre, contraseña, documento, correo, rol) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombre, contraseña, documento, correo, rol]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
}

// Obtener todos los registros del libro
async function getAllRecords() {
  try {
    const result = await pool.query("SELECT * FROM libro ORDER BY fecha DESC");  // Tabla 'libro'
    return result.rows;
  } catch (error) {
    console.error("Error al obtener registros del libro:", error);
    throw error;
  }
}

// Registrar una nueva operación en el libro
async function createRecord({ fecha, tipo, descripcion, monto, numeroRecibo }) {
  try {
    const result = await pool.query(
      "INSERT INTO libro (fecha, tipo, descripcion, monto, numero_recibo) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [fecha, tipo, descripcion, monto, numeroRecibo]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al registrar operación en el libro:", error);
    throw error;
  }
}

export { createUser, getAllUsers, getAllRecords, createRecord };
