import { pool } from "../config/db.js";
import bcrypt from "bcrypt"; // Importa bcrypt para el manejo de contraseñas

// Función para iniciar sesión
async function loginUser(req, res) {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res
      .status(400)
      .json({ mensaje: "Correo y contraseña son requeridos." });
  }

  try {
    const { rows } = await pool.query(
      "SELECT * FROM usuario WHERE correo = $1",
      [correo]
    );
    if (rows.length === 0)
      return res.status(401).json({ mensaje: "Usuario no encontrado." });

    const user = rows[0]; // Compara la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta." });
    }

    // Aquí puedes establecer una sesión o un token para el usuario
    return res
      .status(200)
      .json({ message: "Inicio de sesión exitoso.", userId: user.idusuario });
  } catch (error) {
    console.error("Error en la autenticación:", error);
    return res.status(500).json({ mensaje: "Error del servidor." });
  }
}

// Obtener todos los usuarios
async function getAllUsers() {
  try {
    const { rows } = await pool.query("SELECT * FROM usuario"); // Tabla 'usuario'
    return rows;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
}

// Obtener todos los registros del libro
async function getAllRecords() {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM libro ORDER BY fecha DESC"
    ); // Tabla 'libro'
    return rows;
  } catch (error) {
    console.error("Error al obtener registros del libro:", error);
    throw error;
  }
}

// Crear un nuevo usuario
async function createUser(req, res) {
  const { nombre, contraseña, documento, correo, idrol } = req.body;

  // Verificar que todos los campos están presentes
  if (!nombre || !contraseña || !documento || !correo || !idrol) {
    return res
      .status(400)
      .json({ message: "Todos los campos son requeridos." });
  }

  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Insertar el nuevo usuario en la base de datos
    const { rows } = await pool.query(
      "INSERT INTO usuario (nombre, contraseña, documento, correo, idrol) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombre, hashedPassword, documento, correo, idrol]
    );

    return res
      .status(201)
      .json({ mensaje: "Usuario registrado exitosamente.", usuario: rows[0] });
  } catch (error) {
    // Imprimir el error completo en la consola
    console.error("Error al registrar usuario:", error.message);
    console.error("Detalles del error:", error); // Esto puede proporcionar más información

    return res.status(500).json({ mensaje: "Error al registrar el usuario." });
  }
}

export { createUser, getAllUsers, getAllRecords, createRecord, loginUser };
