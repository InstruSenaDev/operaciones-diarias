import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres.xuuhjaiygfzvkegeqwza", // Asegúrate que este es el nombre correcto
  host: "aws-0-sa-east-1.pooler.supabase.com",
  database: "postgres",
  password: "operacionesdiarias", // Asegúrate de que esta sea la contraseña correcta
  port: 6543, // Puedes usar un número en vez de una cadena
});

pool.connect()
    .then(() => console.log('Conexión exitosa a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

export { pool };
