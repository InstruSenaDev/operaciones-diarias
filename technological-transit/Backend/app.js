// app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dataRouter from './routes/dataRouter.js'; // Incluye la extensión .js

const app = express();
const port = 4000;

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.use('/api', dataRouter);

app.get('/', (req, res) => {
  res.send('Servidor en funcionamiento.');
});

app.listen(port, () => {
  console.log(`Servidor en puerto ${port}`);
});
