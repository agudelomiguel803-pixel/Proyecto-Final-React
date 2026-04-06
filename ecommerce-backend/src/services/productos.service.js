const db = require("../config/db");

const getAll = async () => {
  const [productos] = await db.query("SELECT * FROM productos");
  return productos;
};

const create = async ({ nombre, precio, imagen, descripcion, categoria }) => {
  const [result] = await db.query(
    "INSERT INTO productos (nombre, precio, imagen, descripcion, categoria) VALUES (?, ?, ?, ?, ?)",
    [nombre, precio, imagen, descripcion, categoria]
  );
  return { id: result.insertId, nombre, precio, imagen, descripcion, categoria };
};

const update = async (id, { nombre, precio, imagen, descripcion, categoria }) => {
  await db.query(
    "UPDATE productos SET nombre=?, precio=?, imagen=?, descripcion=?, categoria=? WHERE id=?",
    [nombre, precio, imagen, descripcion, categoria, id]
  );
  return { mensaje: "Producto actualizado" };
};

const remove = async (id) => {
  await db.query("DELETE FROM productos WHERE id=?", [id]);
  return { mensaje: "Producto eliminado" };
};

module.exports = { getAll, create, update, remove };