import ProductCard from "../components/ProductoCard"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useProductos } from "../context/ProductosContext"

function Productos() {
  const { user } = useAuth()
  const { productos = [], agregarProducto, eliminarProducto, editarProducto } = useProductos()

  const [search, setSearch] = useState("")
  const [mostrarForm, setMostrarForm] = useState(false)
  const [form, setForm] = useState({ nombre: "", precio: "", imagen: "" })
  const [exito, setExito] = useState(false)

  const [productoEditando, setProductoEditando] = useState(null)
  const [formEdit, setFormEdit] = useState({ nombre: "", precio: "", imagen: "" })

  // ✅ evitar error si productos es null
  const productosFiltrados = (productos || []).filter((prod) =>
    prod?.nombre?.toLowerCase().includes(search.toLowerCase())
  )

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleChangeEdit = (e) =>
    setFormEdit({ ...formEdit, [e.target.name]: e.target.value })

  // ✅ AGREGAR PRODUCTO
  const handleAgregar = async () => {
    if (!form.nombre || !form.precio || !form.imagen) return

    try {
      await agregarProducto({
        nombre: form.nombre,
        precio: Number(form.precio),
        imagen: form.imagen,
        descripcion: "Producto agregado por el administrador.",
      })

      setForm({ nombre: "", precio: "", imagen: "" })
      setMostrarForm(false)
      setExito(true)

      setTimeout(() => setExito(false), 3000)
    } catch (error) {
      console.error("Error al agregar:", error)
    }
  }

  // ✅ ABRIR EDITAR
  const abrirEditar = (prod) => {
    setProductoEditando(prod)
    setFormEdit({
      nombre: prod.nombre || "",
      precio: prod.precio || "",
      imagen: prod.imagen || "",
    })
  }

  // ✅ EDITAR
  const handleEditar = async () => {
    if (!formEdit.nombre || !formEdit.precio || !formEdit.imagen) return

    try {
      await editarProducto(productoEditando.id, {
        nombre: formEdit.nombre,
        precio: Number(formEdit.precio),
        imagen: formEdit.imagen,
      })

      setProductoEditando(null)
    } catch (error) {
      console.error("Error al editar:", error)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] py-8 px-4">

      <h2 className="text-2xl text-white text-center mb-6">
        Ecommerce ADSO
      </h2>

      {/* ADMIN */}
      {user?.username === "admin" && (
        <div className="mb-6 text-center">

          <button
            onClick={() => setMostrarForm(!mostrarForm)}
            className="bg-orange-500 px-4 py-2 rounded text-white"
          >
            {mostrarForm ? "Cancelar" : "Agregar producto"}
          </button>

          {exito && (
            <p className="text-green-400 mt-2">
              ✅ Producto agregado
            </p>
          )}

          {mostrarForm && (
            <div className="mt-4 space-y-2">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                className="block w-full p-2"
              />
              <input
                type="number"
                name="precio"
                placeholder="Precio"
                value={form.precio}
                onChange={handleChange}
                className="block w-full p-2"
              />
              <input
                type="text"
                name="imagen"
                placeholder="URL imagen"
                value={form.imagen}
                onChange={handleChange}
                className="block w-full p-2"
              />

              <button
                onClick={handleAgregar}
                className="bg-green-500 px-4 py-2 text-white"
              >
                Guardar
              </button>
            </div>
          )}
        </div>
      )}

      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-2"
      />

      {/* LISTA */}
      {productosFiltrados.length === 0 ? (
        <p className="text-gray-400 text-center">
          No hay productos
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {productosFiltrados.map((prod) => (
            <div key={prod.id} className="relative">
              <ProductCard producto={prod} />

              {user?.username === "admin" && (
                <>
                  <button
                    onClick={() => abrirEditar(prod)}
                    className="absolute top-1 right-10 bg-orange-500 text-white px-2"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => eliminarProducto(prod.id)}
                    className="absolute top-1 right-1 bg-red-500 text-white px-2"
                  >
                    X
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* MODAL EDITAR */}
      {productoEditando && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-80 space-y-2">

            <input
              type="text"
              name="nombre"
              value={formEdit.nombre}
              onChange={handleChangeEdit}
              className="w-full p-2"
            />

            <input
              type="number"
              name="precio"
              value={formEdit.precio}
              onChange={handleChangeEdit}
              className="w-full p-2"
            />

            <input
              type="text"
              name="imagen"
              value={formEdit.imagen}
              onChange={handleChangeEdit}
              className="w-full p-2"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setProductoEditando(null)}
                className="bg-gray-400 px-3 py-1"
              >
                Cancelar
              </button>

              <button
                onClick={handleEditar}
                className="bg-blue-500 text-white px-3 py-1"
              >
                Guardar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default Productos