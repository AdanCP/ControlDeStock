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
// INIT DB - CREAR TABLAS BASE
// ==============================
async function initDB() {
  try {
    /* ==============================
       TABLA PRODUCTS
    ============================== */
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        producto TEXT NOT NULL,
        marca TEXT NOT NULL,
        detalle TEXT,
        contenido_peso TEXT NOT NULL
      );
    `);

    /* ==============================
       TABLA ORDERS (PEDIDOS)
    ============================== */
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        product_id INTEGER NOT NULL,
        cantidad INTEGER NOT NULL,
        precio NUMERIC(10,2) NOT NULL,
        fecha DATE NOT NULL,
        estado TEXT NOT NULL CHECK (estado IN ('pendiente', 'llegado')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_product
          FOREIGN KEY (product_id)
          REFERENCES products(id)
          ON DELETE CASCADE
      );
    `);

    console.log("✅ Base de datos conectada");
    console.log("✅ Tablas products y orders listas");
  } catch (error) {
    console.error("❌ Error inicializando la base de datos", error);
  }
}

// Ejecutar al iniciar el backend
initDB();

export default pool;
