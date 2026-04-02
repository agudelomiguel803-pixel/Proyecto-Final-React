const express = require("express");
const router = express.Router();
const db = require("../db");

// 📦 GET — obtener todos
router.get("/", async (req, res) => {
  try {
    const [productos] = await db.query("SELECT * FROM productos");
    res.json(productos);
  } catch (error) {
    console.error("❌ ERROR GET:", error);
    res.status(500).json({ error: error.message });
  }
});

// ➕ POST — agregar
router.post("/", async (req, res) => {
  const { nombre, precio, imagen, descripcion, categoria } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO productos (nombre, precio, imagen, descripcion, categoria) VALUES (?, ?, ?, ?, ?)",
      [nombre, precio, imagen, descripcion, categoria]
    );
    res.json({
      id: result.insertId,
      nombre,
      precio,
      imagen,
      descripcion,
      categoria,
    });
  } catch (error) {
    console.error("❌ ERROR POST:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✏️ PUT — editar
router.put("/:id", async (req, res) => {
  const { nombre, precio, imagen, descripcion, categoria } = req.body;
  try {
    await db.query(
      "UPDATE productos SET nombre=?, precio=?, imagen=?, descripcion=?, categoria=? WHERE id=?",
      [nombre, precio, imagen, descripcion, categoria, req.params.id]
    );
    res.json({ mensaje: "Producto actualizado" });
  } catch (error) {
    console.error("❌ ERROR PUT:", error);
    res.status(500).json({ error: error.message });
  }
});

// ❌ DELETE — eliminar
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM productos WHERE id=?", [req.params.id]);
    res.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    console.error("❌ ERROR DELETE:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;