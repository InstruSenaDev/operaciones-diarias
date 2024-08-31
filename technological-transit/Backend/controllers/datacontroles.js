import { pool } from '../config/db.js';

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
