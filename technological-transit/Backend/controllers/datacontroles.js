import { pool } from '../config/db.js';

<<<<<<< HEAD
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
      export { register, getAllUsuario };
=======
// Función para registrar una nueva persona
async function register({ nombre, contraseña, documento, correo, idrol }) {
    console.log('Datos recibidos en register:', { nombre, contraseña, documento, correo, idrol });
  
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO usuario (nombre, documento, contraseña, correo, idrol) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, documento, contraseña, correo, idrol]
        );
        client.release();
        console.log('Persona registrada con éxito:', result.rows[0]);
        return result.rows[0];
        console.error('Error al registrar persona:', error);
        throw error;
        }

export { register, getAllUsuario };
>>>>>>> e4add318427e6d99c047cb239736ae03898ccfc8
