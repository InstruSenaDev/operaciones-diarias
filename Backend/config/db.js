import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres.xuuhjaiygfzvkegeqwza",
  host: "aws-0-sa-east-1.pooler.subabase.com",
  database: "postgres",
  password: "operacionesdiarias",
  port: "6543",
});

pool.connect()
    .then(() => console.log('Conexión exitosa a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

export { pool };
