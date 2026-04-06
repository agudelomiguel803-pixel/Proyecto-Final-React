const { loginUser } = require("../services/auth.service");

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const usuario = await loginUser(username, password);

    if (!usuario) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = { login };