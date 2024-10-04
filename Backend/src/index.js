import express from 'express';
import bodyParser from 'body-parser'; // Para parsear el body
import datarouters from '../routes/datarouters.js';

const app = express();
const PORT = 4000;

app.use(bodyParser.json()); // Middleware para parsear JSON
app.use('/api', datarouters); // Usa el prefijo /api para las rutas

app.listen(PORT, () => {
  console.log('Server on port', PORT);
});
