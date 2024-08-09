import express from 'express';
import bodyParser from 'body-parser';
import datarouter from './routers/datarouter.js'; // Asegúrate de que la ruta es correcta

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware para manejar el cuerpo de las solicitudes
app.use(bodyParser.json()); // Para manejar JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para manejar datos URL-encoded

// Configurar el enrutador
app.use('/api', datarouter); // Usar el enrutador para manejar '/api'

// Manejo de errores 404 para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
