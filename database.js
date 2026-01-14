import pkg from "pg";
const { Pool } = pkg;

// ==============================
// CONEXIÓN A POSTGRES (RENDER)
// ==============================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // obligatorio en Render
  },
});

// ==============================
// TEST DE CONEXIÓN + INIT DB
// ==============================
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        producto TEXT NOT NULL,
        marca TEXT NOT NULL,
        detalle TEXT,
        contenido_peso TEXT NOT NULL
      );
    `);

    console.log("✅ Base de datos conectada y tabla products lista");
  } catch (error) {
    console.error("❌ Error inicializando la base de datos", error);
  }
}

// Ejecutar al iniciar el backend
initDB();

export default pool;
