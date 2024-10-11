import express from "express";
import cors from "cors"; // Importa el middleware cors
import datarouter from "./routers/datarouter.js";

const app = express();
const PORT = 4000; // Forzamos el puerto a 4000 para cumplir con tu requerimiento

// Configura CORS para permitir todas las solicitudes (ajusta después según lo que necesites)
app.use(
  cors({
    origin: "*", // Permitir todos los orígenes temporalmente
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Usa los métodos de Express para parsear el cuerpo de las solicitudes
app.use(express.json()); // Para procesar solicitudes con JSON
app.use(express.urlencoded({ extended: true })); // Para procesar formularios

// Rutas de la API
app.use("/api", datarouter);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Inicia el servidor en el puerto 4000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
