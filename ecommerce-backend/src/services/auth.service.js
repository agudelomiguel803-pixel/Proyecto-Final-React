const db = require("../config/db");

const loginUser = async (username, password) => {
  const [rows] = await db.query(
    "SELECT * FROM usuarios WHERE username = ? AND password = ?",
    [username, password]
  );

  if (rows.length === 0) return null;

  return { username: rows[0].username, role: rows[0].role };
};

module.exports = { loginUser };