import { pool } from "../config/db.js";

// Función para obtener todos los usuarios
async function getAllUsuario() {
  try {
    const result = await pool.query("SELECT * FROM usuario");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
}

// Función para registrar un nuevo usuario
async function register({ nombre, contraseña, documento, correo, rol }) {
  try {
    const result = await pool.query(
      "INSERT INTO usuario (nombre, contraseña, documento, correo, rol) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [nombre, contraseña, documento, correo, rol]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
}

// Función para obtener todas las operaciones
async function getAllOperaciones() {
  try {
    const result = await pool.query(
      "SELECT * FROM operaciones ORDER BY fecha DESC"
    );
    return result.rows;
  } catch (error) {
    console.error("Error al obtener operaciones:", error);
    throw error;
  }
}

// Función para registrar una nueva operación
async function registerOperacion({
  fecha,
  tipo,
  descripcion,
  monto,
  numeroRecibo,
}) {
  try {
    const result = await pool.query(
      "INSERT INTO operaciones (fecha, tipo, descripcion, monto, numero_recibo) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [fecha, tipo, descripcion, monto, numeroRecibo]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al registrar operación:", error);
    throw error;
  }
}

export { register, getAllUsuario, getAllOperaciones, registerOperacion };
