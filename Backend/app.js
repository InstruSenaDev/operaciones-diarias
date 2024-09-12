import express from 'express';
import cors from 'cors'; // Importa el middleware cors
import datarouter from './routers/datarouter.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Configura CORS de manera más segura (ajusta según tus necesidades)
app.use(cors({
    origin: 'http://example.com', // Cambia esto a los orígenes permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Usa los métodos de Express para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api', datarouter);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

