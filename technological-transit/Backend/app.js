import express from 'express';
import bodyParser from 'body-parser';
import dataRouter from './routes/dataRouter.js'; // Asegúrate de que la ruta es correcta

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Servir archivos estáticos desde 'public'

app.use('/api', dataRouter); // Usar el enrutador para manejar '/api'

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
