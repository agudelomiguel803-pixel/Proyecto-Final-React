const express = require("express")
const router = express.Router()
const db = require("../db")

// 📦 GET — obtener todos
router.get("/", async (req, res) => {
  try {
    const [productos] = await db.query("SELECT * FROM productos")
    res.json(productos)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" })
  }
})

// ➕ POST — agregar
router.post("/", async (req, res) => {
  const { nombre, precio, imagen, descripcion, categoria } = req.body
  try {
    const [result] = await db.query(
      "INSERT INTO productos (nombre, precio, imagen, descripcion, categoria) VALUES (?, ?, ?, ?, ?)",
      [nombre, precio, imagen, descripcion, categoria]
    )
    res.json({ id: result.insertId, nombre, precio, imagen, descripcion, categoria })
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto" })
  }
})

// ✏️ PUT — editar
router.put("/:id", async (req, res) => {
  const { nombre, precio, imagen, descripcion, categoria } = req.body
  try {
    await db.query(
      "UPDATE productos SET nombre=?, precio=?, imagen=?, descripcion=?, categoria=? WHERE id=?",
      [nombre, precio, imagen, descripcion, categoria, req.params.id]
    )
    res.json({ mensaje: "Producto actualizado" })
  } catch (error) {
    res.status(500).json({ error: "Error al editar producto" })
  }
})

// ❌ DELETE — eliminar
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM productos WHERE id=?", [req.params.id])
    res.json({ mensaje: "Producto eliminado" })
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto" })
  }
})

module.exports = router