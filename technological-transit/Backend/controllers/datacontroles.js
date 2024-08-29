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

app.post('/api/register', async (req, res) => {
    try {
        const { nombre, correo, contraseña, documento, rol } = req.body;

        console.log('Datos recibidos:', { nombre, correo, contraseña, documento, rol });

        // Lógica para guardar los datos en la base de datos
        // Ejemplo: await database.saveUser({ nombre, correo, contraseña, documento, rol });

        res.status(201).json({ message: 'Registro exitoso' });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});
 
