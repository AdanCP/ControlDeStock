import express from "express";
import pool from "./database.js";

const router = express.Router();

/* ===== GET ALL PRODUCTS ===== */
router.get("/products", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY producto ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

/* ===== CREATE PRODUCT ===== */
router.post("/products", async (req, res) => {
  const { producto, marca, detalle, contenido_peso } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO products (producto, marca, detalle, contenido_peso)
      VALUES ($1, $2, $3, $4)
      RETURNING id
      `,
      [producto, marca, detalle, contenido_peso]
    );

    res.json({ id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear producto" });
  }
});

/* ===== UPDATE PRODUCT ===== */
router.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { producto, marca, detalle, contenido_peso } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE products
      SET producto=$1, marca=$2, detalle=$3, contenido_peso=$4
      WHERE id=$5
      `,
      [producto, marca, detalle, contenido_peso, id]
    );

    res.json({ updated: result.rowCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al modificar producto" });
  }
});

/* ===== DELETE PRODUCT ===== */
router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM products WHERE id=$1",
      [id]
    );

    res.json({ deleted: result.rowCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

export default router;
