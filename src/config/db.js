import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;
dotenv.config();


export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: false,
});

pool
  .connect()
  .then(() => console.log("🟢 Conectado ao PostgreSQL"))
  .catch((err) => console.error("🔴 Erro ao conectar ao PostgreSQL:", err));

export default pool;