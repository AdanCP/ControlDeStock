import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("❌ Error al abrir la base de datos", err);
  } else {
    console.log("✅ Base de datos SQLite conectada");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    producto TEXT NOT NULL,
    marca TEXT NOT NULL,
    detalle TEXT,
    contenido_peso TEXT NOT NULL,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
