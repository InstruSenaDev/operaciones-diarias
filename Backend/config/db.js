import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres.xuuhjaiygfzvkegeqwza",
  host: "aws-0-sa-east-1.pooler.subabase.com",
  database: "postgres",
  password: "operacionesdiarias",
  port: "6543",
});

export { pool };
