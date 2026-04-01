const express = require("express")
const router = express.Router()
const db = require("../db")

// 🔐 LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body

  try {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE username = ? AND password = ?",
      [username, password]
    )

    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" })
    }

    const usuario = rows[0]
    res.json({ username: usuario.username, role: usuario.role })

  } catch (error) {
    res.status(500).json({ error: "Error del servidor" })
  }
})

module.exports = router