import { pool } from '../config/db.js';

// Función para obtener todas las personas
async function getAllUsuario() {
     async function getAllUsuario() {
            console.error('Error al obtener personas:', error);
            throw error;
        }
    } 

// Función para registrar una nueva persona
async function register({ nombre, contraseña, documento, correo, idrol }) {
    async function register({ nombre, contraseña, documento, correo, idrol }) {
            console.error('Error al registrar persona:', error);
            throw error;
        }
      }

      // Función para obtener todas las operaciones
async function getAllOperaciones() {
    try {
      const result = await pool.query('SELECT * FROM operaciones ORDER BY fecha DESC');
      return result.rows;
    } catch (error) {
      console.error('Error al obtener operaciones:', error);
      throw error;
    }
  }
  
  // Función para registrar una nueva operación
  async function registerOperacion({ fecha, tipo, descripcion, monto, numeroRecibo }) {
    try {
      const result = await pool.query(
        'INSERT INTO operaciones (fecha, tipo, descripcion, monto, numero_recibo) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [fecha, tipo, descripcion, monto, numeroRecibo]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error al registrar operación:', error);
      throw error;
    }
  }
      export { register, getAllUsuario };



