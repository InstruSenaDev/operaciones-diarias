import bcrypt from 'bcrypt';
import { Pool } from '../config/db';

const pool = new Pool();

// Función para registrar una nueva persona
async function register({ nombrecompleta, contraseña, Ndedocumento, correo, idrol }) {
  try {
      console.log('Datos recibidos en registerPerson:', { nombrecompleta, contraseña, Ndedocumento, correo, idrol });

      // Cifrar la contraseña
      const hashedPassword = await bcrypt.hash(contraseña, 10);
      console.log('Contraseña cifrada:', hashedPassword);

      const client = await pool.connect();
      const result = await client.query(
          'INSERT INTO personas (nombrecompleta, contraseña, Ndedocumento, correo, idrol) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [nombrecompleta, hashedPassword, Ndedocumento, correo, idrol]
      );
      client.release();
      console.log('Persona registrada con éxito:', result.rows[0]);
      return result.rows[0];
  } catch (error) {
      console.error('Error al registrar persona:', error);
      throw error;
  }
}

export { register };
