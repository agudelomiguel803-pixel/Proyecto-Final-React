const productosService = require("../services/productos.service");

const getProductos = async (req, res) => {
  try {
    const productos = await productosService.getAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProducto = async (req, res) => {
  try {
    const producto = await productosService.create(req.body);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProducto = async (req, res) => {
  try {
    const result = await productosService.update(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const result = await productosService.remove(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProductos, createProducto, updateProducto, deleteProducto };