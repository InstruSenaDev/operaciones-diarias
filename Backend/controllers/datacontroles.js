import { pool } from "../config/db.js"; // Importa la conexión a la base de datos
import bcrypt from "bcrypt"; // Importa bcrypt para el manejo de contraseñas

// Función para iniciar sesión
async function loginUser(req, res) {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res
      .status(400)
      .json({ message: "Correo y contraseña son requeridos." });
  }

  try {
    const result = await pool.query("SELECT * FROM usuario WHERE correo = $1", [
      correo,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado." });
    }

    const user = result.rows[0];

    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(contraseña, user.contraseña);

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    // Aquí puedes establecer una sesión o un token para el usuario

    return res
      .status(200)
      .json({ message: "Inicio de sesión exitoso.", userId: user.idusuario });
  } catch (error) {
    console.error("Error en la autenticación:", error);
    return res.status(500).json({ message: "Error del servidor." });
  }
}

// Obtener todos los usuarios
async function getAllUsers() {
  try {
    const result = await pool.query("SELECT * FROM usuario"); // Tabla 'usuario'
    return result.rows;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
}

// Obtener todos los registros del libro
async function getAllRecords() {
  try {
    const result = await pool.query("SELECT * FROM libro ORDER BY fecha DESC"); // Tabla 'libro'
    return result.rows;
  } catch (error) {
    console.error("Error al obtener registros del libro:", error);
    throw error;
  }
}

// Registrar una nueva operación en el libro con id_usuario
async function createRecord({
  fecha,
  tipo,
  descripcion,
  monto,
  numeroRecibo,
  idUsuario,
}) {
  try {
    const result = await pool.query(
      "INSERT INTO libro (fecha, tipo, descripcion, monto, numero_recibo, id_usuario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [fecha, tipo, descripcion, monto, numeroRecibo, idUsuario]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al registrar operación en el libro:", error);
    throw error;
  }
}

// Registrar un nuevo usuario
async function createUser(req, res) {
  console.log("Contenido de req.body:", req.body); // Añade este console.log

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
    const result = await pool.query(
      "INSERT INTO usuario (nombre, contraseña, documento, correo, idrol) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombre, hashedPassword, documento, correo, idrol]
    );

    return res.status(201).json({
      message: "Usuario registrado exitosamente.",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return res.status(500).json({ message: "Error al registrar el usuario." });
  }
}
export { createUser, getAllUsers, getAllRecords, createRecord, loginUser };
