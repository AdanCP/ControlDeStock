import express from "express";
import db from "./database.js";

const router = express.Router();

router.get("/products", (req, res) => {
  db.all("SELECT * FROM products ORDER BY producto ASC", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

router.post("/products", (req, res) => {
  const { producto, marca, detalle, contenido_peso } = req.body;

  db.run(
    `
    INSERT INTO products (producto, marca, detalle, contenido_peso)
    VALUES (?, ?, ?, ?)
    `,
    [producto, marca, detalle, contenido_peso],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

router.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { producto, marca, detalle, contenido_peso } = req.body;

  db.run(
    `
    UPDATE products
    SET producto=?, marca=?, detalle=?, contenido_peso=?
    WHERE id=?
    `,
    [producto, marca, detalle, contenido_peso, id],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ updated: this.changes });
    }
  );
});

router.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM products WHERE id=?", [id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ deleted: this.changes });
  });
});

export default router;
