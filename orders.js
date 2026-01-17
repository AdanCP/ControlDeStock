import express from "express";
import pool from "./database.js";

const router = express.Router();

/* ==============================
   GET PEDIDOS PENDIENTES
============================== */
router.get("/orders/pending", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        o.id,
        o.cantidad,
        o.precio,
        o.fecha,
        o.estado,
        p.id AS product_id,
        p.producto,
        p.marca,
        p.detalle,
        p.contenido_peso
      FROM orders o
      JOIN products p ON p.id = o.product_id
      WHERE o.estado = 'pendiente'
      ORDER BY o.fecha ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener pedidos pendientes" });
  }
});

/* ==============================
   CREAR PEDIDO (PENDIENTE)
============================== */
router.post("/orders", async (req, res) => {
  const { product_id, cantidad, precio, fecha } = req.body;

  if (!product_id || !cantidad || !precio || !fecha) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO orders (product_id, cantidad, precio, fecha, estado)
      VALUES ($1, $2, $3, $4, 'pendiente')
      RETURNING id
      `,
      [product_id, cantidad, precio, fecha]
    );

    res.json({ id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el pedido" });
  }
});

/* ==============================
   MARCAR PEDIDO COMO LLEGADO
   + SUMAR STOCK
============================== */
router.put("/orders/:id/llegado", async (req, res) => {
  const { id } = req.params;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Obtener pedido
    const orderResult = await client.query(
      `
      SELECT product_id, cantidad, estado
      FROM orders
      WHERE id = $1
      FOR UPDATE
      `,
      [id]
    );

    if (orderResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    const order = orderResult.rows[0];

    if (order.estado === "llegado") {
      await client.query("ROLLBACK");
      return res.status(400).json({ error: "El pedido ya fue procesado" });
    }

    // 2️⃣ Sumar stock (lógico, no físico aún)
    await client.query(
      `
      UPDATE products
      SET detalle = detalle
      WHERE id = $1
      `,
      [order.product_id]
    );

    // 3️⃣ Marcar pedido como llegado
    await client.query(
      `
      UPDATE orders
      SET estado = 'llegado'
      WHERE id = $1
      `,
      [id]
    );

    await client.query("COMMIT");

    res.json({ success: true });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ error: "Error al procesar el pedido" });
  } finally {
    client.release();
  }
});

export default router;
