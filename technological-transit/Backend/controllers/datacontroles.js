// controllers/dataController.js
import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'tu_base_de_datos',
  port: 5432,
});

client.connect()
  .then(() => console.log('Conectado a PostgreSQL'))
  .catch(err => console.error('Error al conectar a PostgreSQL:', err));

const getLibros = (req, res) => {
  client.query('SELECT * FROM libro', (err, results) => {
    if (err) {
      console.error('Error al obtener libros: ', err.message);
      return res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo obtener la lista de libros. Por favor, intente de nuevo más tarde.'
      });
    }
    res.status(200).json({
      success: true,
      data: results.rows, // Cambia results a results.rows para PostgreSQL
      message: 'Libros obtenidos exitosamente'
    });
  });
};

export default {
  getLibros
};
