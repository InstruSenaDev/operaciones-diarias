import { pool } from '../config/db.js';

// Función para obtener todas las personas
async function getAllUsuario() {
    try {
        console.log('Obteniendo todas las personas...');
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM usuario');
        client.release();
        console.log('Personas obtenidas con éxito:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener personas:', error);
        throw error;
    }
}

// Función para registrar una nueva persona
async function register({ nombre, contraseña, documento, correo, idrol }) {
    try {
        console.log('Datos recibidos en register:', { nombre, contraseña, documento, correo, idrol });
  
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO usuario (nombre, documento, contraseña, correo, idrol) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, documento, contraseña, correo, idrol]
        );
        client.release();
        console.log('Persona registrada con éxito:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al registrar persona:', error);
        throw error;
    }
}

export { register, getAllUsuario };
